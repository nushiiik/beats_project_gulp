(function() {

	const openItem = item => {
		const container = item.closest('.team__item');
		const contentBlock = container.find('.team__content');
		const textBlock = contentBlock.find('.team__content-wrap');
		const reqHeight = textBlock.height();

		container.addClass('team__item--active');
		contentBlock.height(reqHeight);
	}

	const closeItems = container => {
		const items = container.find('.team__content');
		const itemContainer = container.find('.team__item');

		itemContainer.removeClass('team__item--active');
		items.height(0);
	}

	$('.team__link').on('click', (e) => {
		e.preventDefault();

		const currentItem = $(e.currentTarget);
		const container = currentItem.closest('.team');
		const elemContainer = currentItem.closest('.team__item');

		if (elemContainer.hasClass('team__item--active')) {
			closeItems(container);
		} else {
			closeItems(container);
			openItem(currentItem);
		}
	});

})()