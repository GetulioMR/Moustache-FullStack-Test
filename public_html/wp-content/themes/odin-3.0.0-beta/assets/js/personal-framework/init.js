/**
 * FRAMEWORK - INSTANCIATOR
 */
jQuery(document).ready(function($) {

	var
		page = '';
	
	$.each(APP.Modules, function(index, val) {

		if (val.config.ENGAGE) {

			if (Array.isArray(val.config.PAGE)) {

				$.each(val.config.PAGE, function(i, v) {
					
					page = val.config.PAGE === 'general' ? true : $('body').hasClass(v) ? true : $('body').attr('id') === v ? true : false;
					
					if (page) {

						val.init();

						return false;
					}
				});

			} else {
			
				page = val.config.PAGE === 'general' ? true : $('body').hasClass(val.config.PAGE) ? true : $('body').attr('id') === val.config.PAGE ? true : false;

				if (page) {

					val.init();
				}
			}
		}
	});
});