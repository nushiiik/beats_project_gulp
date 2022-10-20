(function() {

	const findBlockByAttr = (attribut) => {
		return $('.card__item').filter((ndx, item) => {
			return $(item).attr('data-linked') == attribut;
		});
	}

	$('.interactive-avatar__link').on('click', (e) => {
		e.preventDefault();

		const currentLink = $(e.currentTarget);
		const target = currentLink.attr('data-open');
		const itemToShow = findBlockByAttr(target);
		const currentItem = currentLink.closest('.interactive-avatar');

		itemToShow.addClass('card__item--active').siblings().removeClass('card__item--active');
		currentItem.addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
	});

})()