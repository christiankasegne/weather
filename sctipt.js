const searchInput = document.querySelector(`.weatherSearch`);
const cityListGroup = document.querySelector(`cityListGroup`);
const city = document.querySelector(`.weatherCity`);
const day = document.querySelector(`.weatherDay`);
const humidity = document.querySelector(`.humidity>.value`);
const wind = document.querySelector(`.wind>.value`);
const pressure = document.querySelector(`.pressure>.value`);
const image = document.querySelector(`.weatherImage`);
const forecastCard = document.querySelector(`.weatherForecast`);
const temperature = document.querySelector(`.weatherTemperature>.value`);
const API_KEY = '2300cfb3aff593c8ac2849b8fdbaab42';
const API_URL =
  'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=' +
  API_KEY;
const FORECAST_URL =
  'https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=' +
  API_KEY;

const weatherImages = [
  {
    url: `images/clear-sky.png`,
    ids: [800],
  },
  {
    url: `images/few-cloud.png`,
    ids: [801],
  },
  {
    url: `images/scattered-clouds.png`,
    ids: [802],
  },
  {
    url: `images/broken-clouds.png`,
    ids: [803, 804],
  },
  {
    url: `images/mist.png`,
    ids: [701, 711, 721, 731, 741, 751, 761, 771, 781],
  },
  {
    url: `images/rain.png`,
    ids: [500, 501, 502, 503, 504],
  },
  {
    url: `images/shower-rain.png`,
    ids: [520, 521, 522, 531, 300, 301, 302, 310, 311, 312, 313, 314, 321],
  },
  {
    url: `images/snow.png`,
    ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  },
  {
    url: `images/thnderstorm.png`,
    ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  },
];

const getWeather = async (city) => {
  const url = API_URL + `&q=` + city;
  const response = await fetch(url);
  if (response.status !== 200) {
    alert(`City not found`);
    return;
  }
  const weather = await response.json();
  return weather;
};

const getForecast = async (id) => {
  const url = FORECAST_URL + `&id=` + id;
  const result = await fetch(url);
  const forecast = await result.json();
  const forecastList = forecast.list;
  const daily = [];

  forecastList.forEach((day) => {
    const date = new Date(day.dt_txt.replace(` `, `T`));
    const hour = date.getHours();
    if (hour == 12) {
      daily.push(day);
    }
  });
  return daily;
};

searchInput.addEventListener(`keydown`, async (e) => {
  if (e.keyCode === 13) {
    const weather = await getWeather(searchInput.value);
    if (!weather) {
      return;
    }
    const cityID = weather.id;
    currentWeather(weather);
    const forecast = await getForecast(cityID);
    updateForecast(forecast);
  }
});

const currentWeather = (data) => {
  city.textContent = data.name + `, ` + data.sys.country;
  day.textContent = dayOfWeek();
  humidity.textContent = data.main.humidity;
  pressure.textContent = data.main.pressure;
  let windDirection;
  let deg = data.wind.deg;
  if (deg > 45 && deg <= 135) {
    windDirection = `East`;
  } else if (deg > 135 && deg <= 255) {
    windDirection = `South`;
  } else if (deg > 225 && deg <= 315) {
    windDirection = `West`;
  } else {
    windDirection = `North`;
  }
  wind.textContent = windDirection + `, ` + data.wind.speed;
  temperature.textContent =
    data.main.temp > 0
      ? +Math.round(data.main.temp)
      : Math.round(data.main.temp);

  let imageId = data.weather[0].id;
  weatherImages.forEach(obj => {
    if (obj.ids.includes(imageId)) {
      image.src = obj.url;
    }
  });
};

const updateForecast = (forecast) => {
  forecastCard.innerHTML = ``;
  forecast.forEach((day) => {
    let iconUrl =
      `http://openweathermap.org/img/wn/` + day.weather[0].icon + `@2x.png`;
    let dayName = dayOfWeek(day.dt * 1000);
    const temperature =
      day.main.temp > 0
        ? +Math.round(day.main.temp)
        : Math.round(day.main.temp);

    const forecastItem = `
      <article class="weatherForecastItem">
        <img src="${iconUrl}" alt="${day.weather[0].description}" class="weatherForecastIcon"></img>
        <h3 class="weatherForecastDay">${dayName}</h3>
        <P class="weatherForecastTemperature"><span class="value">${temperature}</span>&deg;F</P>
      </article>
    `;
    forecastCard.insertAdjacentHTML(`beforeend`, forecastItem);
  });
};

const dayOfWeek = (dt = new Date().getTime()) => {
  return new Date(dt).toLocaleDateString('en-EN', { weekday: 'long' });
};


