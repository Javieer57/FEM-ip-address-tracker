/* HTML elements */
const ipField = document.getElementById('ip-address');
const locationField = document.getElementById('location');
const timezoneField = document.getElementById('timezone');
const ispField = document.getElementById('isp');

//  '../mock-api-data-2.json';
//  '../mock-api-data.json';

async function getIpAddressInfo(ip) {
	// let url = '../mock-api-data.json';
	let url = ip;

	try {
		let response = await fetch(url);

		if (!response.ok) {
			const message = `An error has occured: ${response.status}`;
			throw new Error(message);
		}

		let data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

// getIpAddressInfo().then((data) => console.log(data));
const updatePage = (data) => {
	const lat = data.location.lat;
	const lng = data.location.lng;

	updateInfoFields(data);
	updateMap(lat, lng);
};

function updateInfoFields(info) {
	let ipInfo = info;

	ipField.innerText = ipInfo.ip;
	locationField.innerText = `${ipInfo.location.city}, ${ipInfo.location.region}, ${ipInfo.location.postalCode}`;
	timezoneField.innerText = ipInfo.location.timezone;
	ispField.innerText = ipInfo.isp;
}

/* :: Leftlet :: */
const updateMap = (lat, lng) => {
	var map = L.map('map').setView([lat, lng], 15);

	var myIcon = L.icon({ iconUrl: '../images/icon-location.svg' });

	L.marker([lat, lng], { icon: myIcon }).addTo(map);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '© OpenStreetMap',
	}).addTo(map);
};

const searchIpInfo = (ip) => {
	getIpAddressInfo(ip)
		.then((data) => updatePage(data))
		.catch((error) => error.message);
};
