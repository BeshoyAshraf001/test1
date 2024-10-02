
const city = document.querySelector('h2.city');
const temperature = document.querySelector('h1.temperature');
const temperatureOfNextDay = document.querySelector('h1.temperatureOfNextDay');
const temperatureAfterDay = document.querySelector('h1.temperatureAfterDay');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const today = document.getElementById('today');
const dateHistory = document.getElementById('dateHistory');
const currentDescription = document.getElementById('currentDescription');
const currentIcon = document.getElementById('currentIcon');
const nextDay = document.getElementById('nextDay');
const nextDayIcon = document.getElementById('nextDayIcon');
const nextDayDescription = document.getElementById('nextDayDescription');
const dayAfter = document.getElementById('dayAfter');
const dayAfterIcon = document.getElementById('dayAfterIcon');
const dayAfterDescription = document.getElementById('dayAfterDescription');

async function getDateFromServer(query = 'cairo') {
  try {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c7ae8250ba9c4c80a7a71137242709&q=${query}&days=3`);
    let data = await response.json();

    const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    console.log(data.location.name);

    
    city.textContent = data.location.name;
    temperature.textContent = `${data.current.temp_c}°C`; 
    temperatureOfNextDay.textContent = `${data.forecast.forecastday[1].day.maxtemp_c}°C`; 
    temperatureAfterDay.textContent = `${data.forecast.forecastday[2].day.maxtemp_c}°C`; 
    currentDescription.textContent = data.current.condition.text;
    currentIcon.src = data.current.condition.icon;

    const todayDate = new Date(data.forecast.forecastday[0].date);
    today.textContent = todayDate.toLocaleDateString('en-US', { weekday: 'long' });
    dateHistory.textContent = dateFormatter.format(todayDate);

    const nextDayDate = new Date(data.forecast.forecastday[1].date);
    nextDay.textContent = nextDayDate.toLocaleDateString('en-US', { weekday: 'long' });
    nextDayIcon.src = data.forecast.forecastday[1].day.condition.icon;
    nextDayDescription.textContent = data.forecast.forecastday[1].day.condition.text;

    const dayAfterDate = new Date(data.forecast.forecastday[2].date);
    dayAfter.textContent = dayAfterDate.toLocaleDateString('en-US', { weekday: 'long' });
    dayAfterIcon.src = data.forecast.forecastday[2].day.condition.icon;
    dayAfterDescription.textContent = data.forecast.forecastday[2].day.condition.text;

    setCardHeights();
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function setCardHeights() {
  const cards = document.querySelectorAll(".card");
  let maxHeight = 0;

  cards.forEach((card) => {
    card.style.height = "auto";
  });

  cards.forEach((card) => {
    if (maxHeight < card.scrollHeight) {
      maxHeight = card.scrollHeight;
    }
  });

  cards.forEach((card) => {
    card.style.height = maxHeight + "px";
  });
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getDateFromServer(searchInput.value);
});

searchInput.addEventListener("input", (e) => {
  getDateFromServer(e.target.value);
});

setCardHeights();
document.querySelectorAll('.card-body').forEach((card) => {
  card.style.display = 'flex';
  card.style.flexDirection = 'column';
  card.style.justifyContent = 'center';
  card.style.alignItems = 'center';
});
