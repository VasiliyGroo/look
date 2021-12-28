$(function () {
	$('.menu-open').click(function () {
		$('.nav').toggleClass('show-nav')
	})
});

$(function () {
	$('.menu-open').click(function () {
		$('.nav__link').toggleClass('show-nav__link')
	})
});

$(function () {
	$('.menu-open').click(function () {
		$('.search').toggleClass('show-search')
	})
});

$(function () {
	$('.menu-open').click(function () {
		$('.search__text').toggleClass('show-search__text')
	})
});

$(function () {
	$('.menu-open').click(function () {
		$('.search__btn').toggleClass('show-search__btn')
	})
});

$(function () {
	$('.menu-open').click(function () {
		$('.menu-open').toggleClass('show-menu-open')
	})
});

$(function () {
	$('.menu-open').click(function () {
		$('.switcher').toggleClass('show-switcher')
	})
});

function myFunction(x) {
	x.classList.toggle("change");
}