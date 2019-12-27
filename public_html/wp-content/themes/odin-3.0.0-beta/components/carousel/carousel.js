/*
** FORM - MODULE
*******/
APP.Modules.Carousel = (function ($, Private, Public) {

    'use strict';

    Private = {
        HTML : {
            carouselContainer : '.carousel__items'
        },
        API : {
            posts: {
                url : '/wp-admin/admin-ajax.php?action=get_carousel_posts'
            }
        }
    };

    Public 	= {
		config : {
            ENGAGE : true,
            NAME   : 'Carousel',
            PAGE   : 'home'
        }
	};

    Public.init = function () {
        
        Private.getPosts();
    };

    Private.getPosts = function () {

        $.getJSON(Private.API.posts.url, function(json) {
        	
        	console.log('json -> ', json);

        	if (json) {

        		Private.renderPosts(json);
        	}
        });
    };

    Private.renderPosts = function (posts) {

    	var
    		html = '';

    	$.each(posts, function(index, post) {

            post.post_image = post.post_image ? post.post_image : 'https://via.placeholder.com/390x145';
    		
    		html += '<li class="carousel__post">' +
						'<a href="' + post.post_categories[0].slug + '" title="' + post.post_categories[0].name + '" class="carousel__post__category">' +
							post.post_categories[0].name +
						'</a>' +
						'<figure class="carousel__post__image">' +
							'<img src="' + post.post_image + '" alt="' + post.post_title + '" />' +
						'</figure>' +
						'<a href="' + post.post_name + '" title="' + post.post_title + '" class="carousel__post__content">' +
							'<h3>' +
								post.post_title +
							'</h3>' +
							'<p>' +
								post.post_content +
							'</p>' +
							'<button>' +
								'Link Externo' +
							'</button>' +
						'</a>' +
					'</li>';
    	});

        $(Private.HTML.carouselContainer).html(html);

        // Instance Sub-Module
        APP.SubModules.Carousel.init();
    };

    return Public;

}(jQuery, {}, {}));