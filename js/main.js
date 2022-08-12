/* :: HTML elements :: */
const ipInput = document.getElementById('ip-input');
const ipField = document.getElementById('ip-address');
const locationField = document.getElementById('location');
const timezoneField = document.getElementById('timezone');
const ispField = document.getElementById('isp');

/* :: Leaflet map :: */
let map = L.map('map').setView([0, 0], 15);

const myIcon = L.icon({ iconUrl: '../images/icon-location.svg' });

var marker = L.marker([0, 0], { icon: myIcon }).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '© OpenStreetMap',
}).addTo(map);

/* :: Update functions :: */
const updateMap = (lat, lng) => {
	map.panTo(new L.LatLng(lat, lng));
	marker.setLatLng([lat, lng]);
};

const updatePage = (data) => {
	const lat = data.location.lat;
	const lng = data.location.lng;

	updateInfoFields(data);
	updateMap(lat, lng);
};

const updateInfoFields = (ipInfo) => {
	ipInput.setAttribute('placeholder', 'Search for any IP address or domain');
	ipField.innerText = ipInfo.ip;
	locationField.innerText = `${ipInfo.location.city}, ${ipInfo.location.region}, ${ipInfo.location.postalCode}`;
	timezoneField.innerText = ipInfo.location.timezone;
	ispField.innerText = ipInfo.isp;
};

const standbyState = () => {
	ipInput.value = '';
	ipInput.setAttribute('placeholder', 'Loading...');
	ipField.innerText = '...';
	locationField.innerText = '...';
	timezoneField.innerText = '...';
	ispField.innerText = '...';
};

/* :: Fetch data functions :: */
async function getIpAddressInfo(ip) {
	standbyState();
	//  '../mock-api-data.json';
	//  '../mock-api-data-2.json';
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

/* :: Start function :: */
const searchIpInfo = (ip) => {
	getIpAddressInfo(ip)
		.then((data) => updatePage(data))
		.catch((error) => error.message);
};
