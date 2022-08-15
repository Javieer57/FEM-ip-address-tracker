# Frontend Mentor - IP address tracker solution

This my solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). You can use it in desktop and mobile versions.

## Screenshot

![](./screenshot.png)

## Table of contents

- [Frontend Mentor - IP address tracker solution](#frontend-mentor---ip-address-tracker-solution)
  - [Screenshot](#screenshot)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Links

- Solution URL: [Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0/hub/ip-address-tracker-regex-validations-ipv4-and-ipv6-support-IcK-QXJXeM)
- Live Site URL: [Github Page](https://javieer57.github.io/FEM-ip-address-tracker/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- [SASS](https://sass-lang.com/) - CSS preprocessor
- CSS Grid & Flexbox
- Mobile-first workflow
- [LeafletJS](https://leafletjs.com/) - JS library for maps
- [IP Geolocation API](https://geo.ipify.org/)
- Regular Expressions
- Asynchronous JS and promises

### What I learned

I want the user can search IPv4 and IPv6 (because the API has support for both versions). So, I decided to use a regular expression to validate the input IP:

```JS
const isValidIp = (inputValue) => {
	// Source: regexr.com/38odc
	const ipv4RegEx =
		/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/gi;

	// Source: https://melvingeorge.me/blog/check-if-string-is-valid-ipv6-address-javascript
	const ipv6RegEx =
		/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi;

	return ipv4RegEx.test(inputValue) || ipv6RegEx.test(inputValue) ? true : false;
};
```

Also, I used [LeafletJS](https://leafletjs.com/) to generate the map, and this is the configuration I built for that and the function to update it on every search:

```JS
let map = L.map('map').setView([0, 0], 3);
const myIcon = L.icon({ iconUrl: '../images/icon-location.svg' });
let marker = L.marker([0, 0], { icon: myIcon });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 16,
	attribution: '© OpenStreetMap',
}).addTo(map);

const updateMap = (data) => {
	const lat = data.location.lat;
	const lng = data.location.lng;

	map.setView([lat, lng], 16);
	marker.remove();
	marker.setLatLng([lat, lng]).addTo(map);
};
```

### Useful resources

- [JavaScript Fetch API](https://www.javascripttutorial.net/javascript-fetch-api/) - An article to learn how to use fetch.
- [regrex.com](https://regexr.com/) - On this site, you can learn about regular expressions and test values with them.

## Author

- Frontend Mentor - [@Javieer57](https://www.frontendmentor.io/profile/Javieer57)
- Github - [@Javieer57](https://github.com/Javieer57)
- Portfolio - https://javieereufracio.com/
- Codepen - [@e_javieer](https://codepen.io/e_javieer/)
