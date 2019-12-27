<?php

	function body_mask() {
	    
	    echo '<div class="body-mask toggleClass" data-class="js-menu" data-toggle="remove" data-element="body"></div>';
	}

	add_action('wp_footer', 'body_mask');
?>