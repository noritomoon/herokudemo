// Initialize preloader
jQuery(function ($) {
	$('.hasTooltip').tooltip('hide');

});

/*utility functions*/
(function ($) {
	"use strict";
	$.avia_utilities = $.avia_utilities || {};
	$.avia_utilities.supported = {};
	$.avia_utilities.supports = (function () {
		var div = document.createElement('div'),
			vendors = ['Khtml', 'Ms', 'Moz', 'Webkit', 'O'];  // vendors   = ['Khtml', 'Ms','Moz','Webkit','O'];  exclude opera for the moment. stil to buggy
		return function (prop, vendor_overwrite) {
			if (div.style.prop !== undefined) {
				return "";
			}
			if (vendor_overwrite !== undefined) {
				vendors = vendor_overwrite;
			}

			prop = prop.replace(/^[a-z]/, function (val) {
				return val.toUpperCase();
			});

			var len = vendors.length;
			while (len--) {
				if (div.style[vendors[len] + prop] !== undefined) {
					return "-" + vendors[len].toLowerCase() + "-";
				}
			}
			return false;
		};
	}());

	jQuery(function ($) {

		$('.jp-jplayer').each(function () {
			var $this = $(this),
				url = $this.data('audio'),
				type = url.substr(url.lastIndexOf('.') + 1),
				player = '#' + $this.data('player'),
				audio = {};
			audio[type] = url;

			$this.jPlayer({
				ready              : function () {
					$this.jPlayer('setMedia', audio);
				},
				swfPath            : 'jplayer/',
				cssSelectorAncestor: player
			});
		});
	});

})(jQuery);

/* search icon show/hide */

jQuery(document).click(function () {
	jQuery('.main-nav-search-form').hide();
	jQuery('.main-header-search-form-input').hide();
	jQuery('.header .row').removeClass('relative');
	jQuery('.header .sm-logo,.header nav').css({'opacity': 1});
});

jQuery('.header-search-close').click(function () {
	jQuery('.main-header-search-form-input').hide();
	jQuery('.header .sm-logo,.header nav').css({'opacity': 1});
});

jQuery('.main-nav-search-form').click(function (e) {
	e.stopPropagation();
});
jQuery('.main-header-search-form-input').click(function (e) {
	e.stopPropagation();
});

jQuery('.main-nav-search .search-link').click(function (e) {
	e.stopPropagation();
	if (jQuery('.main-nav-search-form').css('display') == 'block') {
		jQuery('.main-nav-search-form').hide();
	} else {
		jQuery('.main-nav-search-form').stop(true, true).slideDown(250);
		jQuery('.navbar-nav #s').focus();
	}
});

jQuery('.main-header-search .search-link').click(function (e) {
	e.stopPropagation();
	if (jQuery('.main-header-search-form-input').css('display') == 'block') {
		jQuery('.main-header-search-form-input').hide();
	} else {
		jQuery('.main-header-search-form-input').stop(true, true).fadeIn(400);
		jQuery('#header-search-form-input #s').focus();
		jQuery('.header .sm-logo,.header nav').css({'opacity': 0});
	}
});


var generateCarousel = function () {
	if (jQuery().carouFredSel) {
		jQuery(function ($) {
			jQuery('.products-slider').each(function () {
				var carousel = jQuery(this).find('ul');
				carousel.carouFredSel({
					auto      : false,
					prev      : jQuery(this).find('.es-nav-prev'),
					next      : jQuery(this).find('.es-nav-next'),
					align     : "left",
					left      : 0,
					width     : '100%',
					height    : 'variable',
					responsive: true,
					scroll    : {
						items: 1
					},
					items     : {
						width  : 300,
						height : 'variable',
						visible: {
							min: 1,
							max: 30
						}
					}
				});
			});
		});


	}
};

/* jQuery CounTo */

(function (a) {
	a.fn.countTo = function (g) {
		g = g || {};
		return a(this).each(function () {
			function e(a) {
				a = b.formatter.call(h, a, b);
				f.html(a)
			}

			var b = a.extend({}, a.fn.countTo.defaults, {
				from           : a(this).data("from"),
				to             : a(this).data("to"),
				speed          : a(this).data("speed"),
				refreshInterval: a(this).data("refresh-interval"),
				decimals       : a(this).data("decimals")
			}, g), j = Math.ceil(b.speed / b.refreshInterval), l = (b.to - b.from) / j, h = this, f = a(this), k = 0, c = b.from, d = f.data("countTo") || {};
			f.data("countTo", d);
			d.interval && clearInterval(d.interval);
			d.interval =
				setInterval(function () {
					c += l;
					k++;
					e(c);
					"function" == typeof b.onUpdate && b.onUpdate.call(h, c);
					k >= j && (f.removeData("countTo"), clearInterval(d.interval), c = b.to, "function" == typeof b.onComplete && b.onComplete.call(h, c))
				}, b.refreshInterval);
			e(c)
		})
	};
	a.fn.countTo.defaults = {
		from       : 0, to: 0, speed: 1E3, refreshInterval: 100, decimals: 0, formatter: function (a, e) {
			return a.toFixed(e.decimals)
		}, onUpdate: null, onComplete: null
	}
})(jQuery);

jQuery(window).load(function () {
	if (jQuery().waypoint) {
		jQuery('.montana_animated ul.products').waypoint(function () {
			jQuery(function ($) {
				$('.montana_animated ul.products .product_animated:not(".umScaleIn")').each(function (i) {
					var el = $(this);
					setTimeout(function () {
						el.addClass('umScaleIn');
					}, i * 300);
				});
			});
		}, {
			triggerOnce: true,
			offset     : '100%'
		});
	}
});

jQuery(window).load(function () {
	if (jQuery().waypoint) {
		jQuery('.counter-box').waypoint(function () {
			jQuery(this).find('.display-percentage').each(function () {
				var percentage = jQuery(this).data('percentage');
				jQuery(this).countTo({from: 0, to: percentage, refreshInterval: 10, speed: 1000});
			});
		}, {
			triggerOnce: true,
			offset     : 'bottom-in-view'
		});
	}
	generateCarousel();
});

jQuery(function ($) {
	if (jQuery().flexslider) {
		$('.post-formats-wrapper .flexslider').flexslider({
			animation : "slide",
			prevText  : "<i class='fa fa-angle-left'></i>",
			nextText  : "<i class='fa fa-angle-right'></i>",
			controlNav: false
		});
	}
});

//Scroll To top
jQuery(document).ready(function () {
	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() > 100) {
			jQuery('#topcontrol').css({bottom: "15px"});
		} else {
			jQuery('#topcontrol').css({bottom: "-100px"});
		}
	});

	jQuery('#topcontrol').click(function () {
		jQuery('html, body').animate({scrollTop: '0px'}, 800);
		return false;
	});
});

jQuery(function ($) {
	var width_window = $(window).width();
	if (width_window < 767) {
		$height = $('#masthead').height();
		jQuery('#content').css({"padding-top": $height});
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > 60) {
				jQuery('.top-header').css({top: "-100px", height: "0"});
			} else {
				jQuery('.top-header').css({top: "0px", height: "auto"});
			}
		});
	}
	if (width_window < 600) {
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > 60) {
				jQuery('#wpadminbar').css({position: "absolute"});
				jQuery('.admin-bar .site-header').css({top: "0"});
			} else {
				jQuery('#wpadminbar').css({position: "fixed"});
				jQuery('.admin-bar .site-header').css({top: "45px"});
			}
		});
	}
});
jQuery(document).ready(function ($) {
	$(document).on('mouseover', '.minicart_hover', function () {
		$(this).next('.wapper-form-group,.widget_shopping_cart_content').slideDown();
	}).on('mouseleave', '.minicart_hover', function () {
		$(this).next('.widget_shopping_cart_content').delay(200).slideUp();
	});

	$(document)
		.on('mouseenter', '.widget_shopping_cart_content', function () {
			$(this).stop(true, true).show()
		})
		.on('mouseleave', '.widget_shopping_cart_content', function () {
			$(this).delay(200).slideUp()
		});
});

function do_ajax_complete() {
}
jQuery(document).ready(function () {
	count_down = 0;
	countInterval = setInterval(function () {
		if (count_down < 20) {
			jQuery(".parallax_effect .overlay").each(function (index) {
				jQuery(this).css('margin-top', "-" + jQuery(this).parent().eq(0).css('padding-top'));
				jQuery(this).css('margin-bottom', "-" + jQuery(this).parent().eq(0).css('padding-bottom'));
				jQuery(this).css('padding-top', jQuery(this).parent().eq(0).css('padding-top'));
				jQuery(this).css('padding-bottom', jQuery(this).parent().eq(0).css('padding-bottom'));
			});
			count_down++;
		} else {
			clearInterval(countInterval);
		}
	}, 2000);

	if (jQuery('.parallax_effect').length) {
		jQuery('.parallax_effect').each(function () {
			jQuery(this).parallax("50%", 0.6);
		});
	}
}(jQuery));

jQuery('#page,.slider_sidebar_close').click(function () {
	jQuery('.slider_sidebar').removeClass('opened');
	jQuery('html,body').removeClass('slider-bar-opened');
	jQuery('.menu-mobile-left').removeClass('active');
	jQuery('.site-header').removeClass('active');
});
jQuery(document).keyup(function (e) {
	if (e.keyCode == 27) {
		jQuery('.slider_sidebar').removeClass('opened');
		jQuery('html,body').removeClass('slider-bar-opened');
	}
});

jQuery('[data-toggle=offcanvas]').click(function (e) {
	e.stopPropagation();
	jQuery('.menu-mobile-left').toggleClass('active');
	jQuery('.site-header').toggleClass('active');
});

/********************************
 Menu Sidebar
 ********************************/
jQuery('.sliderbar-menu-controller').click(function (e) {
	e.stopPropagation();
	jQuery('.slider_sidebar').toggleClass('opened');
	jQuery('html,body').toggleClass('slider-bar-opened');

});

/*-----------------------------------------------------------------------------------*/
/* Main Menu Dropdown Control
 /*-----------------------------------------------------------------------------------*/
jQuery(function ($) {
	$('.desktop_menu ul li').hover(function () {
		$(this).children('ul').stop(true, true).slideDown(250);
	}, function () {
		$(this).children('ul').stop(true, true).delay(10).slideUp(50);
	});
});

/*Ajax search*/
jQuery(document).ready(function () {
	jQuery('.ob-search-input').on('keyup', function (event) {

		clearTimeout(jQuery.data(this, 'timer'));
		if (event.which == 13) {
			event.preventDefault();
			jQuery(this).stop();
		} else if (event.which == 38) {
			if (navigator.userAgent.indexOf('Chrome') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15) {
				var selected = jQuery(".ob_selected");
				jQuery(".ob_list_search li").removeClass("ob_selected");

				// if there is no element before the selected one, we select the last one
				if (selected.prev().length == 0) {
					selected.siblings().last().addClass("ob_selected");
				} else { // otherwise we just select the next one
					selected.prev().addClass("ob_selected");
				}
			}
		} else if (event.which == 40) {
			if (navigator.userAgent.indexOf('Chrome') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15) {
				var selected = jQuery(".ob_selected");
				jQuery(".ob_list_search li").removeClass("ob_selected");

				// if there is no element before the selected one, we select the last one
				if (selected.next().length == 0) {
					selected.siblings().first().addClass("ob_selected");
				} else { // otherwise we just select the next one
					selected.next().addClass("ob_selected");
				}
			}
		} else if (event.which == 27) {
			jQuery('.main-header-search-form-input').hide();
			jQuery('.header .sm-logo,.header nav').css({'opacity': 1});
			jQuery('.header-search-close').html('<i class="fa fa-times"></i>');
			jQuery('.ob_list_search').html('');
			jQuery(this).val('');
			jQuery(this).stop();
		} else {
			jQuery(this).data('timer', setTimeout(search, 1000));
		}
	});
	jQuery('.ob-search-input').on('keypress', function (event) {

		if (event.keyCode == 13) {
			var selected = jQuery(".ob_selected");
			if (selected.length > 0) {
				var ob_href = selected.find('a').first().attr('href');
				window.location.href = ob_href;
			}
			event.preventDefault();
		}
		if (event.keyCode == 27) {
			jQuery('.main-header-search-form-input').hide();
			jQuery('.header .sm-logo,.header nav').css({'opacity': 1});
		}
		if (event.keyCode == 38) {
			var selected = jQuery(".ob_selected");
			jQuery(".ob_list_search li").removeClass("ob_selected");

			// if there is no element before the selected one, we select the last one
			if (selected.prev().length == 0) {
				selected.siblings().last().addClass("ob_selected");
			} else { // otherwise we just select the next one
				selected.prev().addClass("ob_selected");
			}
		}
		if (event.keyCode == 40) {
			var selected = jQuery(".ob_selected");
			jQuery(".ob_list_search li").removeClass("ob_selected");

			// if there is no element before the selected one, we select the last one
			if (selected.next().length == 0) {
				selected.siblings().first().addClass("ob_selected");
			} else { // otherwise we just select the next one
				selected.next().addClass("ob_selected");
			}
		}
	});
});
function search(waitKey) {
	keyword = jQuery('.ob-search-input').val();

	if (keyword) {
		if (!waitKey && keyword.length < 3) {
			return;
		}
		jQuery('.header-search-close').html('<i class="fa fa-spinner fa-spin"></i>');
		jQuery.ajax({
			type   : 'POST',
			data   : 'action=result_search&keyword=' + keyword,
			url    : ob_ajax_url,
			success: function (html) {
				var data_li = '';
				items = jQuery.parseJSON(html);
				jQuery.each(items, function (index) {
					if (index == 0) {
						data_li += '<li class="ui-menu-item' + this['id'] + ' ob_selected"><a id="ui-id-' + this['id'] + '" class="ui-corner-all" href="' + this['guid'] + '"><i class="icon-page"></i><span class="search-title">' + this['title'] + '</span><span class="search-date">' + this['date'] + '</span></a></li>';
					}
					else if (this['id'] == 0) {
						data_li += '<li class="ui-menu-item' + this['id'] + ' ob_selected"><a id="ui-id-' + this['id'] + '" class="ui-corner-all" href="' + this['guid'] + '"><i class="icon-page"></i><span class="search-title">' + this['title'] + '</span><span class="search-date">' + this['date'] + '</span></a></li>';
					}
					else {
						data_li += '<li class="ui-menu-item' + this['id'] + '"><a id="ui-id-' + this['id'] + '" class="ui-corner-all" href="' + this['guid'] + '"><i class="icon-page"></i><span class="search-title">' + this['title'] + '</span><span class="search-date">' + this['date'] + '</span></a></li>';
					}
				});
				jQuery('.ob_list_search').html('').append(data_li);
				jQuery('.header-search-close').html('<i class="fa fa-times"></i>');
			},
			error  : function (html) {
			}
		});
	}
}
jQuery(function ($) {
	//Menu height fix
	$('.navbar-nav > li').hover(function () {
		$(this).find('.megacol').each(function () {
			var subs = $(this).find(' >li');
			if (subs.length < 2)
				return;
			var maxHeight = Math.max.apply(null, $(this).find(">li").map(function () {
				return $(this).height();
			}).get());
			$(this).find(">li").height(maxHeight);
		})
	})
});

/********************one page *********************/
jQuery(function ($) {
	var adminbar_height = jQuery('#wpadminbar').outerHeight();
	var sticky_height_1 = jQuery('#masthead').outerHeight();
	//var sticky_height = 60;
	//var scrollPosition = parseInt(jQuery(window).scrollTop(), 10);
	jQuery('.navbar-nav li a').click(function (e) {
		if (parseInt(jQuery(window).scrollTop(), 10) > sticky_height_1) {
			var sticky_height = jQuery('#masthead').outerHeight();
			var menu_anchor = jQuery(this).attr('href');
			if (menu_anchor &&
				menu_anchor.indexOf("#") == 0 &&
				menu_anchor.length > 1
			) {
				e.preventDefault();
				$('html,body').animate({
					scrollTop: jQuery(menu_anchor).offset().top - adminbar_height - sticky_height
				}, 850);
			}
		}
		else {
			var menu_anchor = jQuery(this).attr('href');
			if (menu_anchor &&
				menu_anchor.indexOf("#") == 0 &&
				menu_anchor.length > 1
			) {
				e.preventDefault();
				$('html,body').animate({
					scrollTop: jQuery(menu_anchor).offset().top - adminbar_height - sticky_height_1
				}, 850);
			}
		}
	});
});

/*Check menu in the bottom*/
jQuery(document).ready(function () {
	var screenheight = parseInt(jQuery(window).height());
	jQuery(window).scroll(function () {
		var scrollwd = parseInt(jQuery(this).scrollTop());
		var eloffset = parseInt(jQuery('.header').offset().top);
		var checkscroll = eloffset - scrollwd;
		if (checkscroll <= (screenheight / 3)) {
			jQuery('.desktop_menu').removeClass('menu_in_bottom');
		} else {
			jQuery('.desktop_menu').addClass('menu_in_bottom');
		}
	});
});
// lists and grid for category product
function listSwitcher() {
	var activeClass = 'switcher-active';
	var gridClass = 'products-grid';
	var listClass = 'products-list';
	jQuery('.switchToList').click(function () {
		if (!jQuery.cookie('products_page') || jQuery.cookie('products_page') == 'grid') {
			switchToList();
		}
	});
	jQuery('.switchToGrid').click(function () {
		if (!jQuery.cookie('products_page') || jQuery.cookie('products_page') == 'list') {
			switchToGrid();
		}
	});

	function switchToList() {
		jQuery('.switchToList').addClass(activeClass);
		jQuery('.switchToGrid').removeClass(activeClass);
		jQuery('.archive_switch').fadeOut(300, function () {
			jQuery(this).removeClass(gridClass).addClass(listClass).fadeIn(300);
			jQuery.cookie('products_page', 'list', {expires: 3, path: '/'});
		});
	}

	function switchToGrid() {
		jQuery('.switchToGrid').addClass(activeClass);
		jQuery('.switchToList').removeClass(activeClass);
		jQuery('.archive_switch').fadeOut(300, function () {
			jQuery(this).removeClass(listClass).addClass(gridClass).fadeIn(300);
			jQuery.cookie('products_page', 'grid', {expires: 3, path: '/'});
		});
	}
}
listSwitcher();

/* portfolio */
jQuery(document).ready(function () {
	/********************************
	 CSS3 Animations
	 ********************************/
	jQuery(".be-animate").appear();
	jQuery(".be-animate").each(function () {
		var $this = jQuery(this);
		if ($this.is(':appeared')) {
			$this.addClass("already-visible");
			$this.addClass($this.attr('data-animation'));
			$this.addClass('animated');
		}
	});
	jQuery(document).on('appear', '.be-animate', function () {
		var $this = jQuery(this);
		if ($this.is(':appeared')) {
			$this.addClass("already-visible");
			$this.addClass($this.attr('data-animation'));
			$this.addClass('animated');
		}
	});

	jQuery(document).on('click', '.slider-popup', function (e) {
		e.preventDefault();
		jQuery('.gallery-slider-content').addClass("add-fix");
		jQuery("html").addClass("overflow-hidden");
		jQuery('.gallery-slider-content').html('<i class="fa fa-spinner fa-spin"></i>');
		var $this = jQuery(this);
		setTimeout(function () {
			jQuery.ajax({
				type   : "GET",
				url    : $this.attr('data-href'),
				success: function (data) {
					jQuery('.gallery-slider-content').html(data);

					jQuery('.carousel-slider').carousel({
						interval: false
					});
					jQuery('.carousel-slider').css({
						'margin': 0,
						'width' : jQuery(window).outerWidth(),
						'height': jQuery(window).outerHeight()
					});
					jQuery('.carousel-slider .item').css({'position': 'fixed', 'width': '100%', 'height': '100%'});
					jQuery('.carousel-inner div.item img').each(function () {
						var imgSrc = jQuery(this).attr('src');
						jQuery(this).parent().css({
							'background'             : 'url(' + imgSrc + ') center center no-repeat',
							'-webkit-background-size': '100% ',
							'-moz-background-size'   : '100%',
							'-o-background-size'     : '100%',
							'background-size'        : '100%',
							'-webkit-background-size': 'cover',
							'-moz-background-size'   : 'cover',
							'-o-background-size'     : 'cover',
							'background-size'        : 'cover'
						});
						jQuery(this).remove();
					});
					jQuery(window).on('resize', function () {
						jQuery('.carousel-slider').css({
							'width' : jQuery(window).outerWidth(),
							'height': jQuery(window).outerHeight()
						});
					});
					jQuery(document).keyup(function (e) {
						if (e.keyCode == 27) {
							jQuery("html").removeClass("overflow-hidden");
							jQuery('.gallery-slider-content').html("");
							jQuery('.gallery-slider-content').removeClass("add-fix");
						}
					});
					jQuery(document).on('click', '.close-slider', function (e) {
						e.preventDefault();
						jQuery("html").removeClass("overflow-hidden");
						jQuery('.gallery-slider-content').html("");
						jQuery('.gallery-slider-content').removeClass("add-fix");
					});
				}
			});
		}, 300);
	});
	jQuery('.video-popup').magnificPopup({
		disableOn      : 700,
		type           : 'iframe',
		mainClass      : 'mfp-fade',
		removalDelay   : 160,
		preloader      : false,
		fixedContentPos: false
	});

	jQuery(".image-popup").magnificPopup({
		type       : "image",
		image      : {
			titleSrc: function (item) {
				return 'title';
			},
			tError  : '<a href="%url%">The image #%curr%</a> could not be loaded.'
		},
		key        : "image-key",
		verticalFit: true,
		mainClass  : "image-popup-style", // This same class is used for video popup
		tError     : '<a href="%url%">The image</a> could not be loaded.',
		gallery    : {
			enabled : true,
			tCounter: '%curr% of %total%' // markup of counter
		},
		callbacks  : {
			open : function () {
				this.content.addClass("fadeInLeft");
			},
			close: function () {
				this.content.removeClass("fadeInLeft");
			}
		}
	});
	/************************************
	 STICKY SIDEBAR
	 ************************************/
	function be_sticky_sidebar() {
		if (jQuery(".floting-sidebar").length > 0) {
			var $page_content = ".post-formats-wrapper";
			var $sidebar = jQuery(".floting-sidebar"), $window = jQuery(window);
			var offset = $sidebar.offset();
			var $scrollOffset = jQuery(".post-formats-wrapper").offset();
			var mgb = 140 + 30;
			$window.scroll(function () {
				var $scrollHeight = jQuery(".post-formats-wrapper").height(), $headerHeight = 0;
				if (jQuery('.navigation').hasClass('affix')) {
					$headerHeight = parseInt(jQuery('.navigation').css('height'), 10);
				} else {
					$headerHeight = 0;
				}
				if ($window.width() > 960) {
					if ($window.scrollTop() + $headerHeight + 3 > offset.top) {
						if ($window.scrollTop() + $headerHeight + $sidebar.height() + mgb < $scrollOffset.top + $scrollHeight) {
							$sidebar.stop().animate({
								marginTop: $window.scrollTop() - offset.top + $headerHeight + 30
							});
						} else {
							//    $sidebar.stop().animate({
							//        marginTop: ($scrollHeight - $sidebar.height() - 80) -30
							//    });
						}
					} else {
						$sidebar.stop().animate({
							marginTop: 0
						});
					}
				} else {
					$sidebar.css('margin-top', 0);
				}
			});
		}
	}

	be_sticky_sidebar();

});


var scrollTimer = false,
	scrollHandler = function () {
		var scrollPosition = parseInt(jQuery(window).scrollTop(), 10);
		jQuery('.navbar-nav li a[href^=#]').each(function () {
			var thisHref = jQuery(this).attr('href');
			if (jQuery(thisHref).length) {
				var thisTruePosition = parseInt(jQuery(thisHref).offset().top, 10);
				if (jQuery("#wpadminbar").length) {
					var admin_height = jQuery("#wpadminbar").height();
				} else admin_height = 0;
				var thisPosition = thisTruePosition - (jQuery("#masthead").height() + 2 + admin_height);
				// if scroll position < data height
				if (scrollPosition <= parseInt(jQuery(jQuery('.navbar-nav li a[href^=#]').first().attr('href')).height(), 10)) {
					if (scrollPosition >= thisPosition) {
						jQuery('.navbar-nav li a[href^=#]').removeClass('nav-active');
						jQuery('.navbar-nav li a[href=' + thisHref + ']').addClass('nav-active');
					}
				} else {
					if (scrollPosition >= thisPosition || scrollPosition >= thisPosition) {
						jQuery('.navbar-nav li a[href^=#]').removeClass('nav-active');
						jQuery('.navbar-nav li a[href=' + thisHref + ']').addClass('nav-active');
					}
				}
			}
		});
	}

window.clearTimeout(scrollTimer);
scrollHandler();
jQuery(window).scroll(function () {
	window.clearTimeout(scrollTimer);
	scrollTimer = window.setTimeout(function () {
		scrollHandler();
	}, 20);
});