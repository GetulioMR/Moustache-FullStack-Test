/*
** MENU - MODULE
*******/
APP.Modules.Menu = (function ($, Private, Public) {

    'use strict';

    Private = {
        HTML : {
            close : '.header__navbar ul li:first-child a'
        }
    };

    Public 	= {
		config : {
            ENGAGE : true,
            NAME   : 'Menu',
            PAGE   : 'general'
        }
	};

    Public.init = function () {
        
        Private.listeners();
    };

    Private.listeners = function () {

        $(document).on('click', Private.HTML.close, Private.closeMenu);
    };

    Private.closeMenu = function(event) {

        $('body').removeClass('js-menu');

        event.preventDefault();
    };

    return Public;

}(jQuery, {}, {}));