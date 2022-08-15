const IP_GEO_API_CONFIG = {
	apiKey: 'at_YMPCdNQj6VdSH30UzAO3bK2Nf83gn',
	baseURL: 'https://geo.ipify.org/api/v2/country,city?apiKey=',
};

// /* :: HTML elements :: */
const ipAddressForm = document.getElementById('ipAddress-form');
const ipInput = document.getElementById('ip-input');
const ipField = document.getElementById('ip-address');
const locationField = document.getElementById('location');
const timezoneField = document.getElementById('timezone');
const ispField = document.getElementById('isp');

/* :: Leaflet map :: */
let map = L.map('map').setView([0, 0], 3);
const myIcon = L.icon({ iconUrl: '../images/icon-location.svg' });
let marker = L.marker([0, 0], { icon: myIcon });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 16,
	attribution: '© OpenStreetMap',
}).addTo(map);

// /* :: Update functions :: */
const updatePage = (data) => {
	updateInfoFields(data);
	updateMap(data);
};

const updateMap = (data) => {
	const lat = data.location.lat;
	const lng = data.location.lng;

	map.setView([lat, lng], 16);
	marker.remove();
	marker.setLatLng([lat, lng]).addTo(map);
};

const updateInfoFields = (ipInfo) => {
	let ipAddress = ipInfo.ip,
		ipLocation = `${ipInfo.location.city}, ${ipInfo.location.country}, ${ipInfo.location.postalCode}`,
		ipTimezone = ipInfo.location.timezone,
		ipIsp = ipInfo.isp;

	ipInput.setAttribute('placeholder', 'Search for any IP address or domain');

	ipField.innerText = ipAddress;
	locationField.innerText = ipLocation;
	timezoneField.innerText = ipTimezone;
	ispField.innerText = ipIsp;
};

const standbyState = () => {
	let standbyContent = '...';

	ipInput.value = '';
	ipInput.setAttribute('placeholder', 'Loading...');

	ipField.innerText = standbyContent;
	locationField.innerText = standbyContent;
	timezoneField.innerText = standbyContent;
	ispField.innerText = standbyContent;
};

/* :: get data functions :: */
const getParameters = () => {
	let parameters = '';

	if (isValidDomain(ipInput.value)) {
		parameters = `&domain=${ipInput.value}`;
	}

	if (isValidIp(ipInput.value)) {
		parameters = `&ipAddress=${ipInput.value}`;
	}

	return parameters;
};

async function fetchIpData(parameters = '') {
	let endpoint = IP_GEO_API_CONFIG['baseURL'] + IP_GEO_API_CONFIG['apiKey'] + parameters;

	try {
		let response = await fetch(endpoint);

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

/* :: Input validation functions :: */
const isValidIp = (inputValue) => {
	// Source: regexr.com/38odc
	const ipv4RegEx =
		/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/gi;

	// Source: https://melvingeorge.me/blog/check-if-string-is-valid-ipv6-address-javascript
	const ipv6RegEx =
		/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi;

	return ipv4RegEx.test(inputValue) || ipv6RegEx.test(inputValue) ? true : false;
};

const isValidDomain = (inputValue) => {
	// Source: regexr.com/3gcrp
	const domainRegEx = /([a-z0-9A-Z]\.)*[a-z0-9-]+\.([a-z0-9]{2,24})+(\.co\.([a-z0-9]{2,24})|\.([a-z0-9]{2,24}))*/g;

	return domainRegEx.test(inputValue) ? true : false;
};

const isValidInputValue = (value) => {
	return isValidIp(value) || isValidDomain(value) ? true : false;
};

const getIpData = (e) => {
	e.preventDefault();

	if (!isValidInputValue(ipInput.value)) {
		alert('You have entered an invalid IP address or domain!');
	} else {
		let parameters = getParameters();
		fetchIpData(parameters)
			.then((data) => updatePage(data))
			.catch((error) => error.message);
	}
};

/* :: triggers :: */
ipAddressForm.addEventListener('submit', (e) => {
	getIpData(e);
});

fetchIpData()
	.then((data) => updatePage(data))
	.catch((error) => error.message);
