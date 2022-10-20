(function() {

const INITIAL_NUMBER_SLIDE = 1;

class Slider {
	constructor(selector, settings = {}) {
		this.slider = document.querySelector(selector);
		this.current = INITIAL_NUMBER_SLIDE;
		this.slideCount = this.slider.children.length;
		this.settings = settings;
	}

	next() {
		if (this.current < this.slideCount) {
			this.current++;
		} else {
			this.current = 1;
		}
		this.translate();
	}

	prev() {
		if (this.current > 1) {
			this.current--;
		} else {
			this.current = this.slideCount;
		}
		this.translate();
	}

	translate() {
		this.slider.style.transform = `translateX(${(this.current - 1) * (-200)}%)`;
	}

	setEventListener() {
		const btnSlideRight = document.querySelector('.products__slide-arrow--right');
		const btnSlideLeft = document.querySelector('.products__slide-arrow--left');

		btnSlideRight.addEventListener('click', () => {
			this.next();
		});
		btnSlideLeft.addEventListener('click', () => {
			this.prev();
		});
	}

	init() {
		if (this.settings.transition) {
			this.slider.style.transition = `${this.settings.transition}ms`;
		}

		this.setEventListener();
	}

}

const slider = new Slider('#slider', {
	transition: 1000,
});

slider.init();

console.log(slider);

})()