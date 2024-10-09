const form = document.getElementById('weather-form');
const resultDiv = document.getElementById('weather-result');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    const city = document.getElementById('city').value.trim();
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    const apiKey = '4a387a3ca87726c34d7ca4978006afeb'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temp = main.temp;
    const description = weather[0].description;
    const icon = weather[0].icon;

    resultDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p class="weather-info">Temperature: ${temp}°C</p>
        <p class="weather-info">Weather: ${description}</p>
    `;
}
