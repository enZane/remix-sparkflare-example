interface WeatherData {
    latitude: number;
    longitude: number;
    apiKey: string;
    environment: string;
}

const mock = {
    coord: { lon: -104.1229, lat: 24.4461 },
    weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    base: 'stations',
    main: {
        temp: 31.85,
        feels_like: 29.73,
        temp_min: 31.85,
        temp_max: 31.85,
        pressure: 1008,
        humidity: 6,
        sea_level: 1008,
        grnd_level: 792
    },
    visibility: 10000,
    wind: { speed: 2.15, deg: 256, gust: 6.15 },
    clouds: { all: 0 },
    dt: 1717443757,
    sys: { country: 'MX', sunrise: 1717416461, sunset: 1717465328 },
    timezone: -21600,
    id: 4005380,
    name: 'MOCK CITY',
    cod: 200
}

export const getWeatherData = async ({
    latitude,
    longitude,
    apiKey,
    environment,
}: WeatherData) => {
    if (environment !== 'production') {
        return {
            weatherData: mock,
        };
    }

    const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;
    const response = await fetch(openWeatherURL);
    const data = await response.json();
    return {
        weatherData: data,
    };
}