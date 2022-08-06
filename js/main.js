async function getIpInfo() {
	let url = '../mock-api-data.json';
	try {
		let res = await fetch(url);
		return await res.json();
	} catch (error) {
		console.log(error);
	}
}

async function renderIpInfo() {
	let ip = await getIpInfo();

	let ipAddress = document.getElementById('ip-address'),
		location = document.getElementById('location'),
		timezone = document.getElementById('timezone'),
		isp = document.getElementById('isp');

	ipAddress.innerText = ip.ip;
	location.innerText = `${ip.location.city}, ${ip.location.region}, ${ip.location.postalCode}`;
	timezone.innerText = ip.location.timezone;
	isp.innerText = ip.isp;
}

renderIpInfo();

/* :: Leftlet :: */
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '© OpenStreetMap',
}).addTo(map);
