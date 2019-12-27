<?php

	/**
	 * 
	 */
	class Carousel {

		function __construct() {
			
			add_action('wp_ajax_get_carousel_posts', array($this, 'get_carousel_posts'));
			add_action('wp_ajax_nopriv_get_carousel_posts', array($this, 'get_carousel_posts'));
		}

		public function get_carousel_posts () {

			$args = array(
				'post_type' 	 => 'post',
		        'posts_per_page' => 9,
		        'tag' 			 => 'carousel'
		    );

		    $posts = get_posts($args);

		    foreach ($posts as $key => $post) {
		    	
		    	$posts[$key]->post_image = get_the_post_thumbnail_url($post->ID);
		    	$posts[$key]->post_categories = get_the_category($post->ID);
		    }

			echo json_encode($posts);
			exit();
		}
	}

	new Carousel();
?>
