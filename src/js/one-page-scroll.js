(function() {

const sections = $('section');
const display = $('.wrapper__content');
const sideMenu = $('.fixed-menu');
const menuItems = sideMenu.find('.fixed-menu__item');

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

let inScroll = false;

sections.first().addClass('current');

const countSectionPosition = (sectionEq) => {
	const position = sectionEq * -100;
	
	if(isNaN(position)) {
		console.error('Передано неверное значение в countSectionPosition');
		return 0;
	}
	
	return position;
};

const changeMenuThemeForSection = (sectionEq) => {
	const currentSection = sections.eq(sectionEq);
	const menuTheme = currentSection.attr('data-sidemenu-theme');
	const activeClass = 'fixed-menu--shadowed';

	if (menuTheme === "black") {
		sideMenu.addClass(activeClass);
	} else {
		sideMenu.removeClass(activeClass);
	}
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
	items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {
	if (inScroll === false) {
		inScroll = true;

		const transitionOver = 1000;
		const mousInertiaOver = 300;

		const position = countSectionPosition(sectionEq);
		
		changeMenuThemeForSection(sectionEq);

		display.css({
			transform: `translateY(${position}%)`
		});
	
		resetActiveClassForItem(sections, sectionEq, 'current');

		setTimeout(() => {
			inScroll = false;

			resetActiveClassForItem(menuItems, sectionEq, 'fixed-menu__item--current');
		}, transitionOver + mousInertiaOver);
	}
};

const viewportScroller = () => {
	const activeSection = sections.filter('.current');
	const nextSection = activeSection.next();
	const prevSection = activeSection.prev();

	return {
		next() {
			if (nextSection.length) {
				performTransition(nextSection.index());
			}
		},
		prev() {
			if (prevSection.length) {
				performTransition(prevSection.index());
			}
		},
	};
};

$(window).on('wheel', (e) => {
	const deltaY = e.originalEvent.deltaY;
	const scroller = viewportScroller();

	if (deltaY > 0) {
		scroller.next();
	}
	if (deltaY < 0) {
		scroller.prev();
	}
});

$(window).on('keydown', (e) => {
	const tagName = e.target.tagName.toLowerCase();
	const userTypingInputs = tagName === "input" || tagName === "textarea";
	const scroller = viewportScroller();

	if (!userTypingInputs) {
		switch (e.keyCode) {
			case 38:
				scroller.prev();
				break;
	
			case 40:
				scroller.next();
				break;
		}
	}
});

$('.wrapper').on('touchmove', (e) => {
	e.preventDefault();
});

$('[data-scroll-to]').on('click', (e) => {
	e.preventDefault();

	const $this = $(e.currentTarget);
	const target = $this.attr('data-scroll-to');
	const reqSection = $(`[data-section-id=${target}]`);

	performTransition(reqSection.index());
});

if (isMobile) {
	//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
	$("body").swipe( {
		swipe: function (direction) {
			const scroller = viewportScroller();

			if (direction === 'up') scroller.next();
			if (direction === 'down') scroller.prev();

		},
	});
}

})()