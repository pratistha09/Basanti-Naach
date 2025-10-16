const apiKey = 'e6ecbec56ba134767ad286e7eff385b1';
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
    const city = document.getElementById('city').value.trim();
    if(city) fetchWeather(city);
});

async function fetchWeather(city) {
    try {
        const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        console.log(url);
        const response = await fetch(url);
        if(!response.ok) throw new Error('City not found');
        const data = await response.json();

        // Update DOM
        document.getElementById('weatherInfo').style.display = 'block';
        document.getElementById('cityName').innerText = data.name + ', ' + data.sys.country;
        document.getElementById('temp').innerText = data.main.temp;
        document.getElementById('humidity').innerText = data.main.humidity;
        document.getElementById('wind').innerText = data.wind.speed;
        document.getElementById('rain').innerText = data.rain ? data.rain['1h'] : 0;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        // Change background dynamically
        changeBackground(data.weather[0].main);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

function changeBackground(weather) {
    const body = document.body;
    switch(weather.toLowerCase()) {
        case 'clouds':
            body.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
            break;
        case 'rain':
        case 'drizzle':
            body.style.background = 'linear-gradient(to right, #4b79a1, #283e51)';
            break;
        case 'clear':
            body.style.background = 'linear-gradient(to right, #fceabb, #f8b500)';
            break;
        case 'snow':
            body.style.background = 'linear-gradient(to right, #e6dada, #274046)';
            break;
        default:
            body.style.background = 'linear-gradient(to right, #a1c4fd, #c2e9fb)';
    }
}