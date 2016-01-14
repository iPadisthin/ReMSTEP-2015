var videoCodes = ['b799oEj1j0k', 'U9RxRcVFD8w', 'b799oEj1j0k', 'XAaQu_wgB8Q', 'FKTSdl6XEA8', 'gJFpQ7Y1HIY', 'GpOSf7YRbFY'];
var videoTitles = ['Overview', 'OLT Welcome', 'Introduction', 'Deakin University', 'La Trobe University', 'Monash University', 'University of Melbourne'];

function loadVideo(index) {
	var videoCode = videoCodes[index];
	var nextVideoTitle = videoTitles[index + 1];
	var nextIndex = index++;
	var youTubeVid = '<iframe width="560" height="315" src="//www.youtube.com/embed/'+videoCode+'?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
	$('.video-box .vid, .video-box iframe').replaceWith(youTubeVid);
}

$(document).ready(function () {
	
	//smooth scroll
	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      var scrollLocal = target.offset().top - 164; //164 is height of reduced sized header + on-this-page div
		  console.log(scrollLocal);
	      if (target.length) {
		$('html,body').animate({
		  scrollTop: scrollLocal
		}, 1000);
		return false;
	      }
	    }
	  });
	
	//video select handler
	$('.video-select').hover(function(){
		$(this).addClass('hovered').next().show();
	});
	$('.video-menu').mouseleave(function(){
		$('.video-menu ul').hide().prev().removeClass('hovered');
	});
	//video play handler
	$('.play').click(function(event){
		event.preventDefault();
		loadVideo(0);
	});
	//video select handler
	$('.video-menu li').on('click', 'a', function(event){
		event.preventDefault();
		var videoIndex = $(this).parent().index();
		loadVideo(videoIndex);
	});
	

	//window scroll handler
	$(window).on("scroll  touchmove",function(){

			var scrollTop = $(document).scrollTop();
			
			// minimise header
			if(scrollTop > 100){
			    $('header').addClass('small');
			    $('nav').addClass('small');
			} else {
			    $('header').removeClass('small');
			    $('nav').removeClass('small');
			}
			
			/* fix on-this-page to top of page below header */
			if (($('.on-this-page').css('position')=='fixed')) {
				if(scrollTop > 10){
					$('.on-this-page').css(
						{
							'top': '82px'
						}
					);	
					$('.on-this-page ul li:first-child').removeClass('hidden');	
				} else {
					$('.on-this-page').css(
						{
							'top': 'initial'
						}
					);
					$('.on-this-page ul li:first-child').addClass('hidden');
				}
				if(scrollTop > 650){
					$('.on-this-page ul li:last-child').addClass('highlight');
				} else {
					$('.on-this-page ul li:last-child').removeClass('highlight');
				}
			}

	});
	
	//menu click handler
	$('.menu-toggle').click(function(event){
		event.preventDefault();
		if ($(this).hasClass('open')) {
			$('.main-menu ul').removeClass('open').animate({
				left: '-280px'
			});
			$('.overlay').removeClass('on');
			$('body').css({
				overflow: 'auto'
			});
			$(this).removeClass('open');
		} else {
			$('.main-menu ul').addClass('open').animate({
				left: 0	
			});
			$('.overlay').addClass('on');
			$('body').css({
				overflow: 'hidden'
			});
			$(this).addClass('open');
		}
	});
	// close menu when overlay clicked
	$('.overlay').click(function(){
		//trigger menu click handler
		$('.menu-toggle').click();
	});
	// close menu on resize and set left appropriately for desktop menu style
	$( window ).resize(function() {
			$('.overlay').removeClass('on');
			$('.menu-toggle').removeClass('open');
			
		if ($(window).width() > 940) {
			$('.main-menu ul').removeClass('open').css('left','auto');
		} else {
			$('.main-menu ul').css('left','-280px');
		}
	});
	
	/* slide show */
	var numSlides = $('.slide-show-slides img').length;
	var finalMargin = numSlides*100-100;
	var currentMargin = 0;
	$('.slide-show .control').click(function(event){
		event.preventDefault();
		if ($(this).hasClass('next')) {
			if (currentMargin < finalMargin) {
				currentMargin += 100;
				if (currentMargin == 100) {
					$('.prev.control').fadeIn();
				}
				if (currentMargin == finalMargin) {
					$('.next.control').fadeOut();
				}
			}
		} else {
			if (currentMargin > 0) {
				currentMargin -= 100;
				if (currentMargin == 0) {
					$('.prev.control').fadeOut();
				}
				if (currentMargin == finalMargin-100) {
					$('.next.control').fadeIn();
				}
			}
		}
		$('.slide-show-slides').animate({
			marginLeft: '-'+currentMargin+'%'	
		});
	});
	
	/* open full newsletter signup form on email text input focuse */
	$('#mce-EMAIL').focus(function(){
		$('#mc_embed_signup').css('z-index',1);	
	});
	
	/* overlay video button click handler */
	$('.video.button[data-type="overlay"]').on('click',function(event){
		event.preventDefault();
		var containerId = '#'+$(this).attr('data-vid');
		$(containerId).animate({
			left: 0
		});
	});
	/* overlay-video close button click handler */
	$('.overlay-video .close-vid').on('click',function(){
		//using youtube jsapi to pause video - works when enablejsapi=1 is added to video URL string
		$(this).prev().children('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		$(this).parent().animate({
			left: '100%'
		});
	});
// end doc ready
});