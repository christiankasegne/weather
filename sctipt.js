const searchInput = document.querySelector(`.weatherSearch`);
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