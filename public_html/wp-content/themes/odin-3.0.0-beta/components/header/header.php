<header class="header">
	<div class="container">
		<figure class="header__logo">
			<?php the_custom_logo(); ?>
		</figure>
		<button class="header__button toggleClass" data-class="js-menu" data-element="body">
			<i class="fa fa-bars" aria-hidden="true"></i>
		</button>
		<?php echo get_search_form(); ?>
		<nav class="header__navbar">
			<?php
				/**
				 * Main menu.
				 */
				wp_nav_menu( array(
					'theme_location' => 'menu-main',
					'menu_class'     => 'header__navbar__container',
					'container'      => 'ul',
					'depth'          => 2,
				) );
			?>
		</nav>
	</div>
</header>