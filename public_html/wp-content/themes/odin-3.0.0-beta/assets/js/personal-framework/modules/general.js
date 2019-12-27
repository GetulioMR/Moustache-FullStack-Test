/*
** GENERAL - MODULE
*******/
APP.Modules.General = (function ($, Private, Public) {

    'use strict';

    Private = {
        scrollToClass   : '.scrollTo',
        cssToggleClass  : '.toggleClass',
        seeDataClass    : '.seeData'
    };

    Public 	= {
		config : {
            ENGAGE : true,
            NAME   : 'General',
            PAGE   : 'general'
        }
	};

    Public.init = function () {

    	// Instance Sub-Module
    	//APP.SubModules.Carousel.init();
        
        Private.listeners();

    	AOS.init({
    		duration: 900
    	});
    };

    Private.listeners = function () {
        
        // Scroll screen to the configured destination element
        $(document).on('click', Private.scrollToClass, Private.scrollToDestination);

        // Add, remove or toggle class to target element
        $(document).on('click', Private.cssToggleClass, Private.toggleTargetClass);

        // Replace text element by the data-content value
        $(document).on('click', Private.seeDataClass, Private.seeData);
    };

    Private.seeData = function (event) {

        var
            data        = $(this).attr('data-content'),
            responsive  = $(this).attr('data-responsive') ? JSON.parse($(this).attr('data-responsive')) : null,
            text        = $(this).text(),
            bool     = true;
        
        if (data) {

            if (text !== data) {

                $.each(responsive, function(index, val) {

                    bool = window.innerWidth >= parseInt(index, 10) ? val : bool;
                });

                if (bool) {

                    $(this).text(data);

                    if ($(this).attr('title')) {

                        $(this).attr('title', data);
                    }

                    event.preventDefault();
                }
            }
        }
    };

    Private.changeChars = function (string) {

        string = string.toLowerCase();

        string = string.replace(/[áàãäâ]/, 'a');
        string = string.replace(/[éèëê]/, 'e');
        string = string.replace(/[íìïî]/, 'i');
        string = string.replace(/[óòõöô]/, 'o');
        string = string.replace(/[úùüû]/, 'u');
        string = string.replace(/[ç]/, 'c');

        return string;
    };

    // Scroll screen to the configured destination element
    Private.scrollToDestination = function(event) {

        var
            i               = 0,
            element         = this,
            responsive      = $(element).attr('data-responsive') ? JSON.parse($(element).attr('data-responsive')) : null,
            speed           = $(element).attr('data-speed') ? $(element).attr('data-speed') : 900,
            target          = $(element).attr('data-destination'),
            position        = null,
            defaultPosition = null;

        if (target.indexOf('|') > -1) {

            target = target.split('|');

            for (i; i < target.length; i++) {

                target[i] = target[i].trim();
                
                if ($(target[i]).length > 0) {

                    target = target[i];
                    break;
                }
            }
        }

        defaultPosition = target && !Array.isArray(target) && $(target).length > 0 ? $(target).offset().top : null;
        position = defaultPosition;

        if (position) {

			if (responsive) {

	            $.each(responsive, function(index, val) {

	                if (window.innerWidth >= parseInt(index, 10)) {

	                    position = defaultPosition;

	                    if (val.indexOf('+') > -1) {

	                        position += parseInt(val.replace('+', ''), 10);

	                    } else if (val.indexOf('-') > -1) {

	                        position -= parseInt(val.replace('-', ''), 10);
	                    }
	                }
	            });
	        }

            $('html, body').animate({
                scrollTop: position
            }, speed);
         
            event.preventDefault();
        }
    };

    Private.toggleTargetClass = function(event) {

        var
            element     	= this,
            cssClass    	= $(element).attr('data-class'),
            toggleType  	= $(element).attr('data-toggle'),
            resolution  	= $(element).attr('data-resolution'),
            preventDefault 	= $(element).attr('data-prevent') === 'false' ? false : true,
            target      	= $(element).attr('data-element') ? $(element).attr('data-element') : $(element).attr('data-destination');

        if (target) {

	        switch (target) {

	            case 'self':

	            	if ($(element).length > 0) {

		                if (resolution) {

		                    if (resolution.indexOf('-') > -1 && window.innerWidth < parseInt(resolution.replace('-', ''), 10)) {

		                        if (toggleType === 'add') {

		                            $(element).addClass(cssClass);

		                        } else if (toggleType === 'remove') {

		                            $(element).removeClass(cssClass);

		                        } else {

		                            $(element).toggleClass(cssClass);
		                        }

		                    } else if (resolution.indexOf('+') > -1 && window.innerWidth > parseInt(resolution.replace('-', ''), 10)) {

		                        if (toggleType === 'add') {

		                            $(element).addClass(cssClass);

		                        } else if (toggleType === 'remove') {

		                            $(element).removeClass(cssClass);

		                        } else {

		                            $(element).toggleClass(cssClass);
		                        }
		                    }

		                } else {

		                    if (toggleType === 'add') {

		                        $(element).addClass(cssClass);

		                    } else if (toggleType === 'remove') {

		                        $(element).removeClass(cssClass);

		                    } else {

		                        $(element).toggleClass(cssClass);
		                    }
		                }
	            	}

	                break;

	            case 'parent':

	            	if ($(element).parent().length > 0) {

		                if (resolution) {

		                    if (resolution.indexOf('-') > -1 && window.innerWidth < parseInt(resolution.replace('-', ''), 10)) {

		                        if (toggleType === 'add') {

		                            $(element).parent().addClass(cssClass);

		                        } else if (toggleType === 'remove') {

		                            $(element).parent().removeClass(cssClass);

		                        } else {

		                            $(element).parent().toggleClass(cssClass);
		                        }

		                    } else if (resolution.indexOf('+') > -1 && window.innerWidth > parseInt(resolution.replace('-', ''), 10)) {

		                        if (toggleType === 'add') {

		                            $(element).parent().addClass(cssClass);

		                        } else if (toggleType === 'remove') {

		                            $(element).parent().removeClass(cssClass);

		                        } else {

		                            $(element).parent().toggleClass(cssClass);
		                        }
		                    }

		                } else {

		                    if (toggleType === 'add') {

		                        $(element).parent().addClass(cssClass);

		                    } else if (toggleType === 'remove') {

		                        $(element).parent().removeClass(cssClass);

		                    } else {

		                        $(element).parent().toggleClass(cssClass);
		                    }
		                }
		            }

	                break;

	            default:

	            	if ($(target).length > 0) {

		                if (resolution) {

		                    if (resolution.indexOf('-') > -1 && window.innerWidth < parseInt(resolution.replace('-', ''), 10)) {

		                        if (toggleType === 'add') {

		                            $(target).addClass(cssClass);

		                        } else if (toggleType === 'remove') {

		                            $(target).removeClass(cssClass);

		                        } else {

		                            $(target).toggleClass(cssClass);
		                        }

		                    } else if (resolution.indexOf('+') > -1 && window.innerWidth > parseInt(resolution.replace('-', ''), 10)) {

		                        if (toggleType === 'add') {

		                            $(target).addClass(cssClass);

		                        } else if (toggleType === 'remove') {

		                            $(target).removeClass(cssClass);

		                        } else {

		                            $(target).toggleClass(cssClass);
		                        }
		                    }

		                } else {

		                    if (toggleType === 'add') {

		                        $(target).addClass(cssClass);

		                    } else if (toggleType === 'remove') {

		                        $(target).removeClass(cssClass);

		                    } else {

		                        $(target).toggleClass(cssClass);
		                    }
		                }
		            }

	                break;
	        }

	        if (preventDefault) {

	        	event.preventDefault();
	        }
        }
    };

    return Public;

}(jQuery, {}, {}));