let url;
let nowPosition = "대한민국";
let lang = "kr";
let weatherHTML;
let locationField = document.getElementById("locationField");
// 날씨 부르기
const getKoreaWeather = async () => {
	url = new URL(
		`https://api.openweathermap.org/data/2.5/weather?lat=35.9078&lon=127.7669&appid=034a82976238d4d91ee419cce7bd42a4&units=metric`
	);
	render();
};
const searchWeather = async (lat, lon) => {
	url = new URL(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=034a82976238d4d91ee419cce7bd42a4&units=metric`
	);
	render();
};
const render = async () => {
	try {
		url.searchParams.set("lang", lang);
		let response = await fetch(url);
		let data = await response.json();
		if (response.status != 200) {
			throw new Error(data.message);
		}
		if (lang == "kr") {
			weatherHTML = `<div class="row">
							<div class="col-md-6 weatherIMG">
								<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
								<h2 class='now_position'>${nowPosition}</h2>
							</div>
							<div class="col-md-6">
								<iframe
									src="https://www.google.com/maps/embed/v1/place?q=${nowPosition}&key=AIzaSyBGKkuFPtIUBh2c1Gadg1XpDLZDGAXfIZY"
									width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
									referrerpolicy="no-referrer-when-downgrade" class="google_map"></iframe>
								<button class='close_map' onclick="closeMap()" style="display:none">X</button>
							</div>
						</div>
						<div class="weather_detail row">
							<div class="col-md-6 wd-1">
								<h2>${data.weather[0].main}</h2>
								<h4>${data.weather[0].description}</h4>
								<h4>${data.main.temp}°C</h4>
							</div>
							<div class="col-md-6 wd-2">
								<div>
									<div>구름정도: ${data.clouds.all}</div>
									<div>체감 온도: ${data.main.feels_like}°C</div>
									<div>현재 최고 온도: ${data.main.temp_max}°C</div>
									<div>현재 최저 온도: ${data.main.temp_min}°C</div>
								</div>
								<div>
									<div>풍향: ${data.wind.deg}°</div>
									<div>풍속: ${data.wind.speed}m/s</div>
									<div>습도: ${data.main.humidity}%</div>
									<div>기압: ${data.main.pressure}hPa</div>
								</div>
							</div>
						</div>`;
		} else {
			weatherHTML = `<div class="row">
							<div class="col-md-6 weatherIMG">
								<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
								<h2 class='now_position'>${nowPosition}</h2>
							</div>
							<div class="col-md-6">
								<iframe
									src="https://www.google.com/maps/embed/v1/place?q=${nowPosition}&key=AIzaSyBGKkuFPtIUBh2c1Gadg1XpDLZDGAXfIZY"
									width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
									referrerpolicy="no-referrer-when-downgrade" class="google_map"></iframe>
								<button class='close_map' onclick="closeMap()" style="display:none">X</button>
							</div>
						</div>
						<div class="weather_detail row">
							<div class="col-md-6 wd-1">
								<h2>${data.weather[0].main}</h2>
								<h4>${data.weather[0].description}</h4>
								<h4>${data.main.temp}°C</h4>
							</div>
							<div class="col-md-6 wd-2">
								<div>
									<div>Clouds: ${data.clouds.all}</div>
									<div>Feels like: ${data.main.feels_like}°C</div>
									<div>Temp_max: ${data.main.temp_max}°C</div>
									<div>Temp_min: ${data.main.temp_min}°C</div>
								</div>
								<div>
									<div>Wind Direction: ${data.wind.deg}°</div>
									<div>Wind Speed: ${data.wind.speed}m/s</div>
									<div>Humidity: ${data.main.humidity}%</div>
									<div>pressure: ${data.main.pressure}hPa</div>
								</div>
							</div>
						</div>`;
		}
	} catch (error) {
		errorRender(error.message);
	}

	document.getElementById("forecast_board").innerHTML = weatherHTML;
};
getKoreaWeather();
//에러 출력
const errorRender = (error) => {
	weatherHTML = `<div class="alert alert-danger" role="alert">
    ${error}
  </div>
  `;
};
//언어 변경 후 날씨 부르기
const changeLang = () => {
	if (lang == "kr") {
		lang = "en";
		document.getElementById("language").textContent = "Eng";
	} else {
		lang = "kr";
		document.getElementById("language").textContent = "Kr";
	}
	render();
};
// 검색창 팝업+ 모바일 지도 팝업
const openlocationField = () => {
	if (window.innerWidth <= 767) {
		openGoogleMap();
	}
	if (locationField.style.display == "none") {
		locationField.style.display = "inline";
	} else {
		locationField.style.display = "none";
	}
};
const openGoogleMap = () => {
	if (locationField.style.display == "none") {
		document.querySelector(".google_map").style.display = "block";
		document.querySelector(".close_map").style.display = "block";
	} else {
		closeMap();
	}
};

// 모바일 지도 Close Button
const closeMap = () => {
	document.querySelector(".google_map").style.display = "none";
	document.querySelector(".close_map").style.display = "none";
};

// 위치 검색 시 위도 경도로 변환  (참고 사이트: https://jsfiddle.net/gg2hqba3/1/)
var placeSearch, autocomplete;
function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete(
		document.getElementById("autocomplete"),
		{ types: ["geocode"] }
	);
	autocomplete.addListener("place_changed", fillInAddress);
}
function fillInAddress() {
	var place = autocomplete.getPlace();
	nowPosition = document.getElementById("autocomplete").value;
	locationField.style.display = "none";
	searchWeather(place.geometry.location.lat(), place.geometry.location.lng());
}
