async function getWeather(city, info) {
    // Ensure city is an array
    if (!Array.isArray(city)) {
        city = [city];
    }

    // Create an array to hold the results
    const results = [];

    // Fetch weather data for each city
    for (const cityName of city) {
        const url = `http://localhost:3000/weather?city=${encodeURIComponent(cityName)}&info=${info || 'all'}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching weather data for ${cityName}`);
            }
            const result = await response.json();
            results.push(result);
        } catch (error) {
            results.push({ city: cityName, error: error.message }); // Handle fetch errors gracefully
        }
    }

    // Display results
    results.forEach(result => {
        if (result.error) {
            console.log(result.error);
            return;
        }

        const { city, weather } = result;
        console.log(`\nCITY: ${city}`);

        // Display weather information based on requested type
        if (info === 'wind' || info === 'all') {
            const { wind } = weather;
            if (wind) {
                console.log(`WIND: ${wind.speed} m/s, ${wind.deg} deg`);
                if (wind.speed > 15) {
                    console.log('WARNING! Wind speed over 15 m/s');
                }
            }
        }

        if (info === 'clouds' || info === 'all') {
            const { clouds } = weather;
            if (clouds !== undefined) {
                console.log(`CLOUDS: ${clouds} %`);
            }
        }

        if (info === 'temp' || info === 'all') {
            const { temp } = weather;
            if (temp !== undefined) {
                console.log(`TEMP: ${temp} C`);
                if (temp < -20) {
                    console.log('WARNING! Temperature below -20 degrees');
                }
            }
        }

        if (info === 'precipitation' || info === 'all') {
            const { precipitation } = weather;
            if (precipitation !== undefined) {
                console.log(`PRECIPITATION: ${precipitation} %`);
            }
        }
    });
}

// Testing the function
(async () => {
    await getWeather('Berlin', 'wind');
    await getWeather(['Oslo', 'Yakutsk'], 'all');
})();
