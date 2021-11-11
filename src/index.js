let now = new Date();
let apiKey = '2b354ee10180a8ec5f31e475798a3953';
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let day = days[now.getDay()];
let year = now.getFullYear();
let months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'Augst',
	'September',
	'October',
	'November',
	'December',
];
let month = months[now.getMonth()];
let updatedate = `${day}, ${month} ${now.getDate()},${year}`;

function cityName(event) {
	event.preventDefault();
	let pwd = document.querySelector('#EnterCities');
	console.log(pwd.value);
	let h5 = document.querySelector('.card-title');
	h5.innerHTML = pwd.value;
	axios.get(`${apiUrl}?q=${pwd.value}&units=metric&appid=${apiKey}`).then(showTemp);
}

let form = document.querySelector('#SearchCity');
form.addEventListener('submit', cityName);

let currentDate = document.querySelector('.msgBtn');
currentDate.innerHTML = updatedate;

function typeConverter(event) {
	event.preventDefault();
}

let tempType = document.querySelector('#converter');
tempType.addEventListener('click', typeConverter);

function showTemp(response) {
	console.log(response);
	console.log(`Current Temp is${response.data.main.temp}`);
	let h1 = document.querySelector('#converter');
	h1.innerHTML = `Current Temperature ${response.data.main.temp}°c`;
}

function currentCityName(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showposition);
}

let currentCity = document.querySelector('.current');
currentCity.addEventListener('click', currentCityName);

function showposition(position) {
	console.log(position);
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);
	let lat = position.coords.latitude;
	let log = position.coords.longitude;
	axios.get(`${apiUrl}?lat=${lat}&lon=${log}&appid=${apiKey}&units=metric`).then(updateCurrentTemp);
}

function updateCurrentTemp(response) {
	console.log(response);
	console.log(`Current Temp is at your Place is ${response.data.main.temp}`);
	let h5 = document.querySelector('.card-title');
	h5.innerHTML = response.data.name;
	let h1 = document.querySelector('#converter');
	h1.innerHTML = `Current Temperature at your Place ${response.data.main.temp}°c`;
}
