import React from "react";
import "./App.css";

function sayHello(name = "Javascript") {
    // prints a greeting to the console
    console.log(`Hello, ${name}!`);
}
sayHello("World!");

function ExampleComponent() {
    const date = new Date();
    return <p>Today is {date.toDateString()}</p>;
}

function App() {
    // Create our state variables to hold the user's location and the forecast data
    // These will be null until we get the data from the browser or the API
    const [friendlyLocation, setFriendlyLocation] = React.useState(""); // City, State
    const [latitude, setLatitude] = React.useState(0); // latitude coordinate
    const [longitude, setLongitude] = React.useState(0); // longitude coordinate
    const [forecast, setForecast] = React.useState(null); // Weather forecast data

    /**
     * Fetches the weather forecast based on the user's latitude and longitude.
     * It retrieves the location data from the National Weather Service API
     * and then fetches the forecast data for that location.
     */
    const getForecast = React.useCallback(async () => {
        // Make sure the coordinates are set before fetching the forecast
        if (latitude && longitude) {
            setForecast(null); // Reset forecast before fetching new data
            try {
                // Fetch the location data from the National Weather Service API with the coordinates
                const url = `https://api.weather.gov/points/${latitude},${longitude}`;
                const response = await fetch(
                    url,
                    {
                        method: "GET",
                    },
                    {
                        headers: {
                            "User-Agent":
                                "(kennesaw.edu, ccoop125@studente.kennesaw.edu)",
                        },
                    }
                );
                const json = await response.json();
                const forecastUrl = json.properties.forecast;
                // Set the friendly location using the city and state from the response
                const city = json.properties.relativeLocation.properties.city;
                const state = json.properties.relativeLocation.properties.state;
                setFriendlyLocation(`${city}, ${state}`);

                // Using the forecast URL in the response, fetch the forecast data
                const forecastResponse = await fetch(forecastUrl);
                const forecastData = await forecastResponse.json();
                setForecast(forecastData); // Set the forecast data in state
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }
    }, [latitude, longitude]);

    /**
     * Effect hook to get the user's location when the component mounts (starts).
     * It uses the browser's geolocation feature to get the user's current position
     * and then calls getForecast to fetch the weather data.
     */
    React.useEffect(() => {
        // Check if the browser supports geolocation
        if (navigator.geolocation) {
            // get  the user's location from the browser
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
            // Once we have the latitude and longitude, fetch the forecast
            if (latitude && longitude) {
                getForecast();
            }
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, [getForecast, latitude, longitude]); // Run this effect when the component mounts or when latitude/longitude changes

    return (
        <div className="app">
            {friendlyLocation && (
                <h1 className="title">{friendlyLocation} Weather</h1>
            )}
            {forecast ? (
                <>
                    <div className="conditions">
                        <h2>Current Conditions</h2>
                        <p>
                            <strong>
                                {forecast.properties.periods[0].temperature}°
                                {forecast.properties.periods[0].temperatureUnit}
                            </strong>{" "}
                            and {forecast.properties.periods[0].shortForecast}
                        </p>
                        <p>{forecast.properties.periods[0].detailedForecast}</p>
                    </div>
                    <div className="forecast">
                        <h2>Forecast</h2>
                        <ul className="list">
                            {forecast.properties.periods.map(
                                (period, index) =>
                                    index > 0 && (
                                        <li
                                            key={period.number}
                                            className="forecast-item">
                                            <div className="item">
                                                <strong>{period.name}</strong>
                                                {period.icon && (
                                                    <img
                                                        src={period.icon}
                                                        alt={
                                                            period.shortDescription
                                                        }
                                                        className="weather-icon"
                                                    />
                                                )}
                                            </div>
                                            <p>
                                                {period.temperature}°
                                                {period.temperatureUnit} -{" "}
                                                {period.detailedForecast}
                                            </p>
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>
                </>
            ) : (
                <p className="loading">Loading forecast...</p>
            )}
        </div>
    );
}

export default App;
