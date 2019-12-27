/**
 * --------------------------------------------------------------------------
 * Vendors
 * --------------------------------------------------------------------------
 */

// Code here will be linted with JSHint.
/* jshint ignore:start */

/**
 * Popper.js
 *
 * A library used to position poppers in web applications.
 *
 * @link https://popper.js.org
 */
@@include('../../node_modules/popper.js/dist/umd/popper.js')

/**
 * Bootstrap
 *
 * 1. All Bootstrap’s JavaScript files depend on util.js
 * 2. The dropdown.js and popover.js JavaScript files requires Popper.js
 *
 * @link http://getbootstrap.com
 */
@@include('../../node_modules/bootstrap/js/dist/index.js')
@@include('../../node_modules/bootstrap/js/dist/util.js')
@@include('../../node_modules/bootstrap/js/dist/alert.js')
@@include('../../node_modules/bootstrap/js/dist/button.js')
@@include('../../node_modules/bootstrap/js/dist/carousel.js')
@@include('../../node_modules/bootstrap/js/dist/collapse.js')
@@include('../../node_modules/bootstrap/js/dist/dropdown.js')
@@include('../../node_modules/bootstrap/js/dist/modal.js')
@@include('../../node_modules/bootstrap/js/dist/tooltip.js')
@@include('../../node_modules/bootstrap/js/dist/popover.js')
@@include('../../node_modules/bootstrap/js/dist/scrollspy.js')
@@include('../../node_modules/bootstrap/js/dist/tab.js')

@@include('../../node_modules/aos/dist/aos.js')
@@include('../../node_modules/owl.carousel/dist/owl.carousel.min.js')
@@include('../../node_modules/jquery-mask-plugin/dist/jquery.mask.min.js')

// Code here will be ignored by JSHint.



/**
 * Begin - Personal Framework
 */

@@include('personal-framework/config.js')
@@include('personal-framework/sub-modules/carousel.js')
@@include('../../components/header/header.js')
@@include('../../components/carousel/carousel.js')
@@include('../../components/form/form.js')
@@include('../../components/addresses/addresses.js')
@@include('personal-framework/modules/validators.js')
@@include('personal-framework/modules/general.js')
@@include('personal-framework/init.js')

/**
 * End - Framework
 */



/* jshint ignore:end */

/**
 * --------------------------------------------------------------------------
 * Theme
 * --------------------------------------------------------------------------
 */

window.console.log('hello theme area, by Odin');
