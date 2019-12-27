<?php
	/**
	 * 
	 */
	class Address {

		function __construct() {
			
			add_action('wp_ajax_get_addresses', array($this, 'get_addresses'));
			add_action('wp_ajax_nopriv_get_addresses', array($this, 'get_addresses'));
			add_action('init', array($this, 'create_address_post_type'), 1);
		}

		public function create_address_post_type() {

			$address = new Odin_Post_Type(
			    'Endereço', // Nome (Singular) do Post Type.
			    'address' // Slug do Post Type.
			);

			$address->set_labels(
		        array(
		            'name'               => __('Endereços', 'odin'),
					'singular_name'      => __('Endereço', 'odin'),
					'view_item'          => __('Visualizar', 'odin'),
					'edit_item'          => __('Editar', 'odin'),
					'search_items'       => __('Buscar', 'odin'),
					'update_item'        => __('Atualizar', 'odin'),
					'parent_item_colon'  => __('Pai', 'odin'),
					'menu_name'          => __('Endereços', 'odin'),
					'add_new'            => __('Adicionar novo', 'odin'),
					'add_new_item'       => __('Adicionar novo', 'odin'),
					'new_item'           => __('Novo', 'odin'),
					'all_items'          => __('Todos', 'odin'),
					'not_found'          => __('Nenhum endereço encontrado', 'odin'),
					'not_found_in_trash' => __( 'Nenhum endereço encontrado na lixeira', 'odin' )
		        )
		    );

			$address->set_arguments(
			    array(
			        'supports' 	=> array( 'title', 'editor', 'thumbnail' ),
			        'menu_icon' => 'dashicons-admin-site'
			    )
			);
		}

		public function get_addresses() {

			$args = array( 
				'post_type' 	 => 'address',
		        'posts_per_page' => 3
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

	new Address();
?>