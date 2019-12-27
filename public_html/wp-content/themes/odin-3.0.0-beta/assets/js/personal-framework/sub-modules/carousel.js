/*
** CAROUSEL - SUB-MODULE
*******/
APP.SubModules.Carousel = (function ($, Private, Public) {

    'use strict';

    Private = {
        carousel    : '.owl-carousel-instance',
        container   : 'ul, .ul',
        classes     : 'owl-carousel owl-theme',
        config      : {
            default: {
                nav: true,
                dots: true,
                autoplay: true,
                responsive: {
                    0:{
                        items: 1
                    },
                    575:{
                        items: 2
                    },
                    768:{
                        items: 3
                    }
                }
            },
            loop: true,
            margin: 15,
            autoplayTimeout: 6000,
            responsiveClass: true,
            navText: [
                '‹',
                '›'
            ]
        }
    };

    Public = {
        config : {
            NAME   : 'Carousel',
            ENGAGE : true
        }
    };

    Public.init = function () {

        Private.instanceOwl();
    };

    Private.instanceOwl = function () {

        $(Private.carousel).each(function(index, el) {

            Private.config.responsive   = $(el).attr('data-responsive') ? JSON.parse($(el).attr('data-responsive')) : Private.config.default.responsive;
            Private.config.dots         = $(el).attr('data-bullets') === 'true' ? true : Private.config.default.dots;
            Private.config.dots         = $(el).attr('data-bullets') === 'false' ? false : Private.config.dots;
            Private.config.nav          = $(el).attr('data-nav') === 'true' ? true : Private.config.default.nav;
            Private.config.nav          = $(el).attr('data-nav') === 'false' ? false : Private.config.nav;
            Private.config.autoplay     = $(el).attr('data-autoplay') === 'true' ? true : Private.config.default.autoplay;
            Private.config.autoplay     = $(el).attr('data-autoplay') === 'false' ? false : Private.config.autoplay;

            $(el).addClass('initialized').find(Private.container).addClass(Private.classes).owlCarousel(Private.config);
        });
    };

    return Public;

}(jQuery, {}, {}));