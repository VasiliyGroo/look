var header = $('.header'),
		scrollPrev = 0;

$(window).scroll(function() {
	var scrolled = $(window).scrollTop();
 
	if ( scrolled > 50 && scrolled > scrollPrev ) {
		header.addClass('big');
	} else {
		header.removeClass('big');
	}
	scrollPrev = scrolled;
});