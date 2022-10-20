(function() {

	class Modal {
	constructor(selector, classMod) {
		this.menu = document.querySelector(selector);
		this.classMod = classMod;
	}

	open() {
		this.menu.classList.add(this.classMod);
	}

	close() {
		this.menu.classList.remove(this.classMod);
	}

	setEventListener() {
		document.addEventListener('click', (e) => {
			const targetBtnEvent = e.target.closest('[data-event]');
			if (targetBtnEvent) {
				const event = targetBtnEvent.dataset.event;
				this[event]();
			}
		})
	}
}

const menu = new Modal('#full-menu', 'fullscreen--opened');
menu.setEventListener();

console.log(menu);

})()