(function() {

	const mesureWidth = item => {
		let reqItemWidth = 0;

		const screenWidth = $(window).width();
		const container = item.closest('.colors__list');
		const linkBlocks = container.find('.colors__link');
		const linksWidth = linkBlocks.width() * linkBlocks.length;

		const textContainer = item.find('.colors__container');
		const paddingLeft = parseInt(textContainer.css('padding-left'));
		const paddingRight = parseInt(textContainer.css('padding-right'));

		const isMobile = window.matchMedia('(max-width: 806px)').matches;

		if (isMobile) {
			reqItemWidth = screenWidth - linksWidth;
		} else {
			reqItemWidth = 500;
		}

		return {
			container: reqItemWidth,
			textContainer: reqItemWidth - paddingLeft - paddingRight
		}
	};

	closeEveryItemInContainer = container => {
		const items = container.find('.colors__item');
		const content = container.find('.colors__content');

		items.removeClass('active');
		content.width(0);
	};

	const openItem = item => {
		const hiddenContent = item.find('.colors__content');
		const reqWidth = mesureWidth(item);
		const textBlock = item.find('.colors__container');

		item.addClass('active');
		hiddenContent.width(reqWidth.container);
		textBlock.width(reqWidth.textContainer);
	};

	$('.colors__link').on('click', (e) => {
		e.preventDefault();

		const $this = $(e.currentTarget);
		const item = $this.closest('.colors__item');
		const itemOpened = item.hasClass('active');
		const container = $this.closest('.colors__list');

		if (itemOpened) {
			closeEveryItemInContainer(container);
		} else {
			closeEveryItemInContainer(container);
			openItem(item);
		}
	});

	$('.colors__close').on('click', (e) => {
		e.preventDefault();

		closeEveryItemInContainer($('.colors__list'));
	});

})()