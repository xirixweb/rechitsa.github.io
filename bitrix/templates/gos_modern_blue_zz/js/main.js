// РћРїСЂРµРґРµР»СЏРµРј РїРµСЂРµРјРµРЅРЅСѓСЋ РґР»СЏ СЌРєРѕРЅРѕРјРёРё РїР°РјСЏС‚Рё.
var doc = $(document),
	menuTimer,
	touchStartPos;

doc
	.on('click keypress', '.search-button', function(e) {
		if (e.type == 'keypress' && e.which != 13) {
			return;
		} 
		if(e.type == 'keypress' && e.which == 13) {
			$('.container-search').find('.search-input').addClass('tabindex');
		}
		// РћР±СЂР°Р±РѕС‚РєР° РЅР°Р¶Р°С‚РёСЏ РЅР° РєРЅРѕРїРєСѓ РїРѕРёСЃРєР°
		$('.container-search').addClass('opened').find('.search-input').focus();
		var $hamburger = $('.hamburger');
		if ($hamburger.hasClass('active')) {
			$hamburger.trigger('click');
		}
	})
	.on('click', '.search-close-button', function() {
		// РћР±СЂР°Р±РѕС‚РєР° РЅР°Р¶Р°С‚РёСЏ РЅР° РєРЅРѕРїРєСѓ Р·Р°РєСЂС‹С‚РёСЏ РїРѕРёСЃРєР°
		$('.container-search').removeClass('opened');
	})
	.on('blur', '.search-input.tabindex', function() {
		if ($(this).val() === '') {
			$(this).closest('.container-search').removeClass('opened');
			$('.search-button').focus();
		}
	})
	.on('input', '.search-input', function() {
		/**
		 * @todo Р­С‚РѕС‚ РєРѕРґ РЅРµРѕР±С…РѕРґРёРјРѕ СѓРґР°Р»РёС‚СЊ, РѕРЅ С‚СѓС‚ С‚РѕР»СЊРєРѕ РґР»СЏ РґРµРјРѕРЅСЃС‚СЂР°С†РёРё РїРѕРІРµРґРµРЅРёСЏ РїРѕРёСЃРєР°
		 */
		if ($(this).val() !== '') {
			$('.search-suggestions').slideDown(500);
		} else {
			$('.search-suggestions').slideUp(300);
		}
	})
	.on('click touchend', '.top-nav-block .parent > a, .top-header-nav .parent > a', function(e) {
		// РћР±СЂР°Р±РѕС‚РєР° РєР»РёРєР° Рё С‚Р°С‡Р° РїРѕ СЂРѕРґРёС‚РµР»СЊСЃРєРёРј РїСѓРЅРєС‚Р°Рј РІРµСЂС…РЅРµРіРѕ РјРµРЅСЋ
		if (e.type == 'touchend') {
			$(this).off('click');
			var $this = $(this),
				$parent = $this.closest('.parent');
			if ($parent.hasClass('active')) {
				$parent.removeClass('active').siblings();
			} else {
				$parent.addClass('active').siblings().removeClass('active');
			}
			
			return false;
		}
	})
	.on('touchstart', '.mobile-nav li.parent > a', function (e) {
		e.preventDefault();
		touchStartPos = getTopElementPostition(this);
	})
	.on('click touchend', '.mobile-nav li.parent > a', function (e) {
		if (e.type == 'touchend') {
			$(this).off('click');
			// РЎРІРѕСЂР°С‡РёРІР°РµРј/СЂР°Р·РІРѕСЂР°С‡РёРІР°РµРј РїСѓРЅРєС‚С‹ РјРµРЅСЋ РЅР° РјРѕР±РёР»СЊРЅРѕРј СЃ СѓС‡С‘С‚РѕРј СЃРІР°Р№РїРѕРІ.
			var distance = touchStartPos - getTopElementPostition(this);
			if (isNotSwiped(distance)) {
				var $this = $(this),
					$parent = $this.closest('.parent');
				if ($parent.hasClass('active')) {
					$parent.removeClass('active');
				}
				else {
					$parent.addClass('active');
				}
			}
		}
		return false;
	})
	.on('input keyup', '.jq-selectbox__search input', function() {
		$(this).closest('ul').perfectScrollbar('update');

	})
	.on('click', '.toggle-next', function(e) {
		// РЎРІРѕСЂР°С‡РёРІР°РЅРёРµ/СЂР°Р·РІРѕСЂР°С‡РёРІР°РЅРёРµ СЃР»РµРґСѓСЋС‰РµРіРѕ Р·Р° С‚РµРєСѓС‰РёРј СЌР»РµРјРµРЅС‚Р°
		e.preventDefault();
		$(this).toggleClass('opened').next().slideToggle(500);
	})
	.on('touchend', '.footer-menu-content ul .h4', function() {
		// РЎРІРѕСЂР°С‡РёРІР°РµРј/СЂР°Р·РІРѕСЂР°С‡РёРІР°РµРј РјРµРЅСЋ РІ С„СѓС‚РµСЂРµ СЃР°Р№С‚Р° С‚РѕР»СЊРєРѕ РЅР° С‚Р°С‡-СѓСЃС‚СЂРѕР№СЃС‚РІР°С…	
		$(this).toggleClass('opened').next().slideToggle(500);
	})
	.on('click', '.sidebar-nav .parent > a', function(e) {
		// РњРµРЅСЋ РІ СЃР°Р№РґР±Р°СЂРµ
		e.preventDefault();
		var $parent = $(this).parent();

		if ($parent.hasClass('current')) {
			$parent.removeClass('current');
		} else {
			$('.sidebar-nav .parent').removeClass('current');
			$parent.addClass('current');
		}
		return false;
	})
	// РџСЂРё РїРµСЂРІРѕРј РЅР°РІРµРґРµРЅРёРё РЅР° Р±Р»РѕРє СЃ РјРµРЅСЋ РґРµР»Р°РµРј Р·Р°РґРµСЂР¶РєСѓ РґР»СЏ РїСЂРµРґРѕС‚РІСЂР°С‰РµРЅРёСЏ СЃР»СѓС‡Р°Р№РЅРѕРіРѕ РїРѕРєР°Р·Р° РїСѓРЅРєС‚РѕРІ
	.on('mouseenter', '.top-nav-block', function() {
		var $this = $(this);
		if (menuTimer) {
			clearTimeout(menuTimer);
			menuTimer = null;
		}
		menuTimer = setTimeout(function () {
			$this.addClass('hovered');
		}, 400);		
	})
	.on('mouseleave', '.top-nav-block', function() {
		if (menuTimer) {
			clearTimeout(menuTimer);
			menuTimer = null;
		}
		$(this).removeClass('hovered').find('.parent').removeClass('active');
		$(':focus').blur();
	})
	.on('mouseenter', '.top-header-nav-ul, .top-nav-block', function() {
		$('.top-header-nav-ul, .top-nav-block').find('.parent').removeClass('active');
		$(':focus').blur();		
	})
	.on('mouseenter focusin touchend', '.container-top-navigation .parent > a', function(e) {
		// РћР±СЂР°Р±РѕС‚РєР° РІС‹РїР°РґР°СЋС‰РµРіРѕ РјРµРЅСЋ РІ С€Р°РїРєРµ
		var $this = $(this),
			$parent = $this.closest('li'),
			$second = $this.next('.second-level');

		if (e.type == 'focusin') {
			$('.top-nav-block').addClass('hovered');
			// РЈР±РёСЂР°РµРј Сѓ РІРЅСѓС‚СЂРµРЅРЅРёС… СЃСЃС‹Р»РѕРє РІ РјРµРЅСЋ tabindex
			$('.container-top-navigation .second-level a').prop('tabindex', false);
			// Р”РѕР±Р°РІР»СЏРµРј tabindex РґР»СЏ РІРЅСѓС‚СЂРµРЅРЅРёС… СЃСЃС‹Р»РѕРє РІ С‚РµРєСѓС‰РµРј РїСѓРЅРєС‚Рµ РјРµРЅСЋ
			$second.find('a').prop('tabindex', 1);

			if ($parent.hasClass('active')) {
				$parent.removeClass('active');
			} else {
				$parent.addClass('active').siblings().removeClass('active');
			}
		}

		if ($second.length) {
			$second.css('top', $parent.height() + $parent.position().top);
		}
	})
	.on('focusin', '.top-nav-block > ul > li > a', function() {
		var $this = $(this),
			$parent = $this.closest('li');
		if (!$parent.hasClass('parent')) {

			$('.top-nav-block .parent').removeClass('active');
			$parent.addClass('active');
			$('.top-nav-block .second-level a').prop('tabindex', false);
		}
	})
	.on('focusin', '.top-header-nav-ul .parent > a', function(e) {
		var $this = $(this),
			$parent = $this.closest('.parent'),
			$a = $parent.find('ul a');
		
		if (e.type == 'focusin') {
			// РЈР±РёСЂР°РµРј Сѓ РІРЅСѓС‚СЂРµРЅРЅРёС… СЃСЃС‹Р»РѕРє РІ РјРµРЅСЋ tabindex
			$('.top-header-nav-ul .parent ul a').prop('tabindex', false);
			// Р”РѕР±Р°РІР»СЏРµРј tabindex РґР»СЏ РІРЅСѓС‚СЂРµРЅРЅРёС… СЃСЃС‹Р»РѕРє РІ С‚РµРєСѓС‰РµРј РїСѓРЅРєС‚Рµ РјРµРЅСЋ
			$a.prop('tabindex', 1);
		}

		if ($parent.hasClass('active')) {
			$parent.removeClass('active');
		} else {
			$parent.addClass('active').siblings().removeClass('active');
		}
	})
	.on('blur', '.top-header-nav-ul .parent ul li:last a', function() {
		$('.top-header-nav-ul  .parent').removeClass('active');
	})
	.on('refresh', '.styler', function() {
		// РџСЂРё РїРµСЂРµСЃС‡С‘С‚Рµ СЃС‚РёР»РёР·Р°С†РёРё СЃРµР»РµРєС‚РѕРІ РЅРµРѕР±С…РѕРґРёРјРѕ РІС‹РїРѕР»РЅРёС‚СЊ С‚Рѕ, 
		// С‡С‚Рѕ РїРѕ-С…РѕСЂРѕС€РµРјСѓ РґРѕР»Р¶РЅРѕ РІС‹РїРѕР»РЅРёС‚СЊСЃСЏ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ РІ РїР»Р°РіРёРЅРµ.
		stylerRefresh();
	});

if (window.frameCacheVars !== undefined) {
	// РљРѕРјРїРѕР·РёС‚
	BX.addCustomEvent('onFrameDataReceived', mainJsFile);
} else {
	// РћР±С‹С‡РЅС‹Р№ СЂРµР¶РёРј
	$(mainJsFile);
}

// РћСЃРЅРѕРІРЅРѕР№ js-РєРѕРґ, РІС‹РїРѕР»РЅСЏРµРјС‹Р№ РїСЂРё Р·Р°РіСЂСѓР·РєРµ СЃС‚СЂР°РЅРёС†С‹
function mainJsFile() {
	// РЎС‚СЂРѕРёРј РјРѕР±РёР»СЊРЅСѓСЋ РЅР°РІРёРіР°С†РёСЋ
	$.simpleMobileNav({
		navBlock: '.top-nav-block > ul',
		navContainer: '.mobile-nav',
		navWrapper: '.mobile-nav-wrapper',
		beforeNavOpen: function () {
			var $searchCloseButton = $('.search-close-button');
			if ($searchCloseButton.is(':visible')) {
				$searchCloseButton.trigger('click');
			}
		}
	});

	//associated select 
    $("#official").styler();
	$('#official').change(function() {
		$result = $('select').val();  
		$("#position").val($result).trigger('refresh'); 
		return false;
	});	
	$("#position").styler();
	$('#position').change(function() {
		$("#official").val($(this).val()).trigger('change'); 
		return false;
	});	
 


	// РўР°Р±С‹ СЃ СЃРµР»РµРєС‚Р°РјРё
	// Р­С‚РѕС‚ РєРѕРґ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ РІС‹С€Рµ РїР»Р°РіРёРЅР° styler 
	// РґР»СЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРѕР№ СЃС‚РёР»РёР·Р°С†РёРё СЃРµР»РµРєС‚РѕРІ, РєРѕС‚РѕСЂС‹Рµ РѕРЅ СЃРѕР·РґР°С‘С‚.
	var $firstSelect;

	$.tabsToSelect({
		selectCalss: 'styler',
		selectAppendTo: '.tts-tabs-switchers-wrapper',
		onInit: function () {
			// Р—Р°РїРѕРјРёРЅР°РµРј РїРµСЂРІС‹Р№ СЃРµР»РµРєС‚
			$firstSelect = $('.tts-tabs-select:first');
		},
		onResized: function () {
			// РћР±РЅРѕРІР»СЏРµРј СЃС‚РёР»РёР·Р°С†РёСЋ СЃРµР»РµРєС‚Р°, РµСЃР»Рё РѕРЅ СЃС‚Р°РЅРѕРІРёС‚СЃСЏ РІРёРґРёРјС‹Рј РїСЂРё СЂРµСЃР°Р№Р·Рµ СЃС‚СЂР°РЅРёС†С‹
			if ($firstSelect.is(':visible') && !$firstSelect.hasClass('refreshed')) {
				$('.tts-tabs-select').addClass('refreshed').trigger('refresh');
			}
		},
		beforeTabSwich: function (e) {
			// Р•СЃР»Рё Сѓ РїРµСЂРµРєР»СЋС‡Р°С‚РµР»СЏ С‚Р°Р±Р°, РїРѕ РєРѕС‚РѕСЂРѕРјСѓ РєР»РёРєР°РµРј, РµСЃС‚СЊ data-Р°С‚СЂРёР±СѓС‚ - Р·РЅР°С‡РёС‚ РїРµСЂРµР№РґС‘Рј РїРѕ СЃСЃС‹Р»РєРµ РІ РЅС‘Рј.
			var link = $(e.currentTarget).find('.tts-tabs-switcher').eq(e.tab).data('targetSelf');

			if (link) {
				location.href = link;
				return false;
			}
			return true;
		}
	}); 

	// РЎР»Р°Р№РґРµСЂ РЅР° РіР»Р°РІРЅРѕР№ СЃС‚СЂР°РЅРёС†Рµ
	var $bigSlider = $('.big-slider'),
		$bigSliderParams = $bigSlider.data() || {};

	$bigSlider.owlCarousel({
		items: 1,
		loop: ($bigSliderParams.owlLoop == 'y') ? true : false,
		autoplay: ($bigSliderParams.owlAutoplay == 'y') ? true : false,
		autoplayTimeout: $bigSliderParams.owlAutoplayTimeout * 1000,
		autoplayHoverPause: true,
		navContainer: '.big-slider-nav',
		navText: ['', ''],
		responsive: {
			0: {
				nav: false,
				dots: true
			},
			768: {
				nav: true,
				dots: false
			}
		}
	});

	

	//popup authors, feedback page
	$('#popup').click(function(e) {
		e.preventDefault();
		$('.alert-success-form').show();
		$('html, body').animate({
	        scrollTop: $(".alert-success-form").offset().top
	    }, 2000);
	});
	$('#close-btn_authors').click(function() {
		$('.alert-success-form').hide();
	});

	//С‚Р°Р±С‹ РІ РѕР±СЂР°С‰РµРЅРёРё
   $('.form-choise a').on('click', function(e) {
        e.preventDefault();
        $('.form-choise a.active').removeClass('active');
        $(this).addClass('active');
        var tab = $(this).attr('href');
        $('.form-choosen').not(tab).css({'display':'none'});
        $(tab).fadeIn(400);

        $('.form-choise input').val($(this).attr('value'));
    });


	//СѓРєРѕСЂР°С‡РёРІР°РЅРёРµ С‚РµРєСЃС‚Р°
	$('.form-more-text').shorten({
		showChars: 180,
		moreText: ' ',
		lessText: ' ',
		onMore: function() {
			$('.morelink').text($('.more-text').attr('value'));
			$('.less').text($('.less-text').attr('value'));
		},
		onLess: function() {
			$('.morelink').text($('.more-text').attr('value'));
			$('.less').text($('.less-text').attr('value'));
		}
	});
	$('.morelink').text($('.more-text').attr('value'));
	$('.less').text($('.less-text').attr('value'));

	//Р—Р°РіСЂСѓР·РєР° С„Р°Р№Р»РѕРІ РІ РѕР±СЂР°С‰РµРЅРёРё
	//var count = 1;
	//var countnamne = 0;
	// $(".form-file-upload input[type=file]").on('change', function(){
		
 // 		count++; countnamne++;  
 // 		$(this).attr('data-number', count);
 //        var filename = $(this).val().replace(/.*\\/, "");
 //     	var file2 = $(this).get(0).files[0];

 //     	console.log(file2);

 //        $("div.file-block").prepend("<div class='file-line' data-filename='file"+countnamne+"'><span class='filename show-upload'>"+filename+"</span><p class='delete-upload del show-upload'></p></div>");
 //    	$("div.file-block").prepend("<input type='file' name='file["+file2+"]' value=''>");
 //    	return false;
 //    });
    




    //Р”РѕР±Р°РІРёС‚СЊ Р°РІС‚РѕСЂРѕРІ
    $('.form-add-author').on('click', function(e) {
        e.preventDefault();
	   // РїРѕРєР°Р·Р°С‚СЊ РїРµСЂРІС‹Р№ СЃРєСЂС‹С‚С‹Р№ РїРѕ РїРѕСЂСЏРґРєСѓ
	   $('.added-author:hidden').eq(0).show("slow");
	   // СЃРєСЂС‹С‚СЊ РєРЅРѕРїРєСѓ РїСЂРё РѕС‚СЃСѓС‚СЃС‚РІРёРё СЃРєСЂС‹С‚С‹С… СЌР»РµРјРµРЅС‚РѕРІ
	   $('.added-author:hidden').length<1 ? $('.form-add-author').hide() : false;
	   $('.added-author:hidden').length<1 ? $('.btn-add-line').hide() : false;

	   //С‚РµСЃС‚РѕРІС‹Р№ РїРѕРєР°Р· РІСЃРµС… СЌР»РµРјРµРЅС‚РѕРІ
	   if ($('input[name="author_1_lastname"]').val() == "test"){
            $('.added-author:hidden').show("slow");
        }

	});

    $('.form-del-author').on('click', function(e) {
        e.preventDefault();
		$(this).parent().hide("slow" );
		$(this).parent().find('input').val('');
		$('.form-add-author').show();
		$('.btn-add-line').show();
	});	

	//Р—Р°РїСЂРµС‚ РєРѕРїРёСЂРѕРІР°РЅРёСЏ
	$('textarea.disablecopypaste').bind('copy paste', function (e) {
       e.preventDefault();
    });

	// РЎС‚РёР»РёР·Р°С†РёСЏ СЃРµР»РµРєС‚РѕРІ
	$('.styler').styler({
		selectSearch: true,
		selectSearchLimit: 20,
		onSelectOpened: function() {
			// Рє РѕС‚РєСЂС‹С‚РѕРјСѓ РїСЂРёРјРµРЅСЏРµРј РїР»Р°РіРёРЅ СЃС‚РёР»РёР·Р°С†РёРё СЃРєСЂРѕР»Р»Р±Р°СЂР°
			$(this).find('ul').perfectScrollbar();
		},
		onFormStyled: function () {
			$('.jq-selectbox').addClass('opacity-one');
		}
	});

	// РћРґРёРЅР°РєРѕРІР°СЏ РІС‹СЃРѕС‚Р° Р±Р»РѕРєРѕРІ
	$('.equal').matchHeight();

}

	//С‡РµРє-Р±РѕРєСЃ, РїРµСЂРµРґР°С‡Р° Р°С‚СЂРёР±СѓС‚Р°
    $(document).on('change', 'input[type="checkbox"]', function() {
	    if(this.checked) {
	       $(this).attr("checked", true);
	    }else {          
           $(this).attr("checked", false);
        }
	});


   	//Р¤Р°Р№Р»С‹ РІ РѕР±СЂР°С‰РµРЅРёРё
   	$(document).on('click', '.delete-upload', function() {
		$(this).parent().find('.filename').removeClass('show-upload').text('');
		$(this).parent().find( ".delete-upload" ).removeClass('show-upload');
		    return false;
	});	

	count=0;
	$(document).on('click', "#load", function(){
		count++; 
		$("div.file-block").prepend("<div class='file-line hidden'><span class='filename show-upload span"+count+"'>...</span><input type='file' name='file[]' class='class"+count+"' style='display: none;'><p class='delete-upload del show-upload'></p></div>");

		$(".class"+count+"").trigger('click');		
		$(".class"+count+"").change(function(){
		    var filename = $(this).val().replace(/.*\\/, "");	

		    if (filename != '') {
			   $(this).parent().removeClass('hidden');
			   $("div.file-block .file-line .filename.show-upload.span"+count+"").text(filename);
		    }
	                
        });
    });

	

/**
 * РћРїСЂРµРґРµР»СЏРµРј РІ РєР°РєРѕР№ РїРѕР·РёС†РёРё РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ С‚Р°РїРЅСѓР» РїРѕ СЌРєСЂР°РЅСѓ С‚РµР»РµС„РѕРЅР°
 */
function getTopElementPostition(element) {
	return $(element).position().top || $(element).offset().top || $(window).scrollTop();
}
/**
 * РћРїСЂРµРґРµР»СЏРµРј СЃРґРІРёРЅСѓР» Р»Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ СЌРєСЂР°РЅ.
 */
function isNotSwiped(distance) {
	if (distance > 20 || distance < -20) {
		return false;
	}
	return true;
}
/**
 * РћР±РЅРѕРІР»СЏРµРј СЃС‚РёР»РёР·Р°С†РёСЋ СЃРµР»РµРєС‚РѕРІ
 */
function stylerRefresh() {
	$('.jq-selectbox').addClass('opacity-one');
}


// Р¤СѓРЅРєС†РёРё РґР»СЏ СЂРµР°Р»РёР·Р°С†РёРё Р°РґР°РїС‚РёРІРЅРѕСЃС‚Рё С‚Р°Р±Р»РёС†С‹
	function splitTable(original) {
		original.wrap('<div class="table-wrapper" />');

		var copy = original.clone();
		copy.find('td:not(:first-child), th:not(:first-child)').css('display', 'none');
		copy.removeClass('table-responsive');

		original.closest('.table-wrapper').append(copy);
		copy.wrap('<div class="pinned" />');
		original.wrap('<div class="scrollable" />');

		setCellHeights(original, copy);
	}

	function unsplitTable(original) {
		original.closest('.table-wrapper').find('.pinned').remove();
		original.unwrap();
		original.unwrap();
	}

	function setCellHeights(original, copy) {
		var tr = original.find('tr'),
			tr_copy = copy.find('tr'),
			heights = [];

		tr.each(function (index) {
			var self = $(this),
				tx = self.find('th, td');

			tx.each(function () {
				var height = $(this).outerHeight(true);
				heights[index] = heights[index] || 0;
				if (height > heights[index]) heights[index] = height;
			});

		});

		tr_copy.each(function (index) {
			$(this).height(heights[index]);
		});
	}