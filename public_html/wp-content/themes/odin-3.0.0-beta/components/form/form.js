/*
** FORM - MODULE
*******/
APP.Modules.Form = (function ($, Private, Public) {

    'use strict';

    Private = {
        FORM: {
            id      : '.form__contact',
            submit  : '.form__contact input[type=submit]',
            fields  : {
                name            : {
                    selector    : '.form__contact [name=name]',
                    type        : 'isName',
                    required    : true
                },
                email           : {
                    selector    : '.form__contact [name=email]',
                    type        : 'isEmail',
                    required    : true
                },
                phone           : {
                    selector    : '.form__contact [name=phone]',
                    type        : 'isPhone',
                    required    : true
                },
                birthdate       : {
                    selector    : '.form__contact [name=birthdate]',
                    type        : 'isDate',
                    required    : true
                },
                zipcode         : {
                    selector    : '.form__contact [name=zipcode]',
                    type        : 'isZipcode',
                    required    : true
                },
                address         : {
                    selector    : '.form__contact [name=address]',
                    type        : 'isGeneric',
                    required    : true
                },
                number          : {
                    selector    : '.form__contact [name=number]',
                    type        : 'isNumber',
                    required    : true
                },
                neighborhood    : {
                    selector    : '.form__contact [name=neighborhood]',
                    type        : 'isGeneric',
                    required    : true
                },
                city            : {
                    selector    : '.form__contact [name=city]',
                    type        : 'isGeneric',
                    required    : true
                },
                state           : {
                    selector    : '.form__contact [name=state]',
                    type        : 'isGeneric',
                    required    : true
                }
            }
        },
        API : {
            cep : {
                url : '//viacep.com.br/ws/#zipcode#/json/'
            },
            form: {
                url : '/wp-admin/admin-ajax.php?action=send_contact'
            }
        }
    };

    Public 	= {
		config : {
            ENGAGE : true,
            NAME   : 'Form',
            PAGE   : 'home'
        }
	};

    Public.init = function () {
        Private.listeners();
        Private.maskFields();
    };

    Private.listeners = function () {

        $.each(Private.FORM.fields, function(index, val) {
            
            $(document).on('focusout', val.selector, val, Private.validateField);
            $(document).on('keyup', val.selector, val, Private.validateField);
        });

        $(document).on('keyup', Private.FORM.fields.zipcode.selector, Private.getAddress);
        $(document).on('submit', Private.FORM.id, Private.validateForm);
    };

    Private.validateForm = function (event) {

        var
            error    = false,
            formData = 'action=send_contact&';

        $.each(Private.FORM.fields, function(index, val) {

            $(val.selector).trigger('focusout');

            if ($(val.selector).hasClass('alert-danger')) {

                error = true;
            }
        });
        
        if (error) {
        
            $('html, body').animate({
                scrollTop: $($(Private.FORM.id).find('.alert-danger')[0]).offset().top - $('header.header').height() - $('#wpadminbar').height() - 60
            }, 900);
        
        } else {

            formData += $(Private.FORM.id).serialize();

            console.log('formData -> ', formData);

            $.post(Private.API.form.url, $(Private.FORM.id).serialize(), function(data) {
                
                console.log('data -> ', data);
            });
        }

        event.preventDefault();
    };

    Private.getAddress = function () {

        var
            value   = null,
            force   = true,
            url     = Private.API.cep.url.replace('#zipcode#', this.value),
            map     = {
                bairro      : Private.FORM.fields.neighborhood.selector,
                localidade  : Private.FORM.fields.city.selector,
                logradouro  : Private.FORM.fields.address.selector,
                uf          : Private.FORM.fields.state.selector
            };

        if (this.value.length > 8) {

            jQuery.getJSON(url, function(json) {

                $.each(map, function(index, val) {

                    value = $(val).val();
                    
                    if (force || !value) {

                        $(val).val(json[index]).trigger('focusout');
                    }
                });                
            });
        }        
    };

    Private.validateField = function (event) {

        if (event.data.required || this.value) {

            if (event.type !== 'keyup' || (event.type === 'keyup' && this.value)) {

                $(this).removeClass('alert-success alert-danger');

                if (APP.Validators[event.data.type](this.value)) {

                    $(this).addClass('alert-success');
                
                } else {

                    $(this).addClass('alert-danger');
                }
            }
        }

        event.preventDefault();
    };

    Private.maskFields = function () {

        var
            SPMaskBehavior = function (val) {
              
                return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
            },
            spOptions = {
                
                onKeyPress: function(val, e, field, options) {
                    
                    field.mask(SPMaskBehavior.apply({}, arguments), options);
                }
            };

        $(Private.FORM.fields.birthdate.selector).mask('00/00/0000');
        $(Private.FORM.fields.zipcode.selector).mask('00000-000');
        $(Private.FORM.fields.phone.selector).mask(SPMaskBehavior, spOptions);
    };

    return Public;

}(jQuery, {}, {}));