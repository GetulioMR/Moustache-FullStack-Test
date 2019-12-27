<?php

/**
 * Add Custom Logo support
 *
 * @link https://developer.wordpress.org/themes/functionality/custom-logo/
 */
function odin_custom_logo_setup() {
    
    $defaults = array(
        'width'       => 40,
        'height'      => 15,
        'flex-height' => true,
        'flex-width'  => true,
    );
    
    add_theme_support('custom-logo', $defaults);
}

add_action('after_setup_theme', 'odin_custom_logo_setup');

function custom_menu() {
	
	register_nav_menus(
		array(
			'menu-main' => __('Menu Principal')
		)
	);
}

add_action('init', 'custom_menu');


?>