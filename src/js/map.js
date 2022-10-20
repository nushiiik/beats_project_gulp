(function() {

let myMap;

const init = () => {
	myMap = new ymaps.Map("map", {
		center: [55.750948, 37.595982],
		zoom: 14,
		controls: []
	});

	const coords = [
		[55.758638, 37.582808],
		[55.749810, 37.604062],
		[55.757690, 37.624132],
		[55.742951, 37.581405]
	];

	const myCollection = new ymaps.GeoObjectCollection({}, {
		draggable: false,
		iconLayout: 'default#image',
		iconImageHref: './img/icons/marker.svg',
		iconImageSize: [58, 73],
		iconImageOffset: [-35, -52]
	});

	coords.forEach(coord => {
		myCollection.add(new ymaps.Placemark(coord));
	});

	myMap.geoObjects.add(myCollection);

	myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);

})()