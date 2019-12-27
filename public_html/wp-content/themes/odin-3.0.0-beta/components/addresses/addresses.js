/*
** ADDRESS - MODULE
*******/
APP.Modules.Address = (function ($, Private, Public) {

    'use strict';

    Private = {
        HTML : {
            addressesContainer : '.addresses__container'
        },
        API : {
            posts: {
                url : '/wp-admin/admin-ajax.php?action=get_addresses'
            }
        }
    };

    Public 	= {
		config : {
            ENGAGE : true,
            NAME   : 'Address',
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
    		html = '',
            aos  = [
                'fade-right',
                'zoom-in',
                'fade-left'
            ],
            i = 0;

    	$.each(posts, function(index, post) {

            i = i < 3 ? i : 0;
            post.post_image = post.post_image ? post.post_image : 'https://via.placeholder.com/390x145';
    		
            html += '<div class="col-12 col-sm-6 col-lg-4 addresses__container__item" data-aos="' + aos[i] + '">' +
                        '<h2>' +
                            post.post_title +
                        '</h2>' +
                        '<figure>' +
                            '<img src="' + post.post_image + '" alt="' + post.post_title + '" />' +
                            '<figcaption>' +
                                '<span>' +
                                    post.post_content +
                                '</span>' +
                            '</figcaption>' +
                        '</figure>' +
                    '</div>';
            i++;
    	});

        $(Private.HTML.addressesContainer).html(html);
    };

    return Public;

}(jQuery, {}, {}));