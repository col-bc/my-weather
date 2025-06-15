# My Weather App: Fetching Current and Forecasted Weather Data with React

To get this code onto your computer, click the green "Code" button at the top of this page and select "Download ZIP". Unzip the file and open the folder. You can also clone this repository using `git` (if it's installed) by running the command `git clone

```bash
git clone https://github.com/col-bc/my-weather.git`
```
This will create a new folder called `my-weather` in your current directory. You can then navigate into this folder using the command `cd my-weather`.

## Table of Contents
- [My Weather App: Fetching Current and Forecasted Weather Data with React](#my-weather-app-fetching-current-and-forecasted-weather-data-with-react)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Safety and Security Considerations](#safety-and-security-considerations)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Step 1: Setup](#step-1-setup)
    - [Step 2: Create State Variables](#step-2-create-state-variables)
    - [Step 3: Create Fetch Function](#step-3-create-fetch-function)
    - [Step 4: Trigger Data Fetch](#step-4-trigger-data-fetch)
    - [Step 5: Display Information](#step-5-display-information)
    - [Step 6: Add Stylesheet (Optional)](#step-6-add-stylesheet-optional)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [License](#license)
  - [Additional Resources](#additional-resources)

## Introduction
This project demonstrates how to build a simple web application using **React** to fetch real-time weather data from the **National Weather Service API**. The application displays current conditions and a detailed forecast for the user's current location. This repository serves as a supplemental resource to the detailed instructions document on "Fetch implementation in React".

## Features
* Displays current temperature and weather conditions (e.g., "86°F and Mostly Cloudy then Showers And Thunderstorms Likely").
* Provides a multi-day weather forecast with detailed descriptions for each period.
* Automatically detects the user's geographic location to retrieve relevant weather data.
* Utilizes React Hooks (`useState()`, `useEffect()`, `useCallback()`) for efficient state management and data fetching.
* Dynamic rendering of weather data once retrieved from the API.

## Safety and Security Considerations
When working with code, especially when interacting directly with your computer's filesystem via the terminal application, it is crucial to exercise caution.
* **File System Interaction:** There is no safety system in place to restore files once deleted, or undo commands once executed. Files are not sent to the recycling bin when deleted and there is no warning about potential damage.
* **Untrusted Code:** Do not copy and paste any commands or code from the internet unless you know the author is trusted and reputable. Never run any executable files from the internet unless it is from a reputable source and digitally signed by the manufacturer.
* **Malware Protection:** Always keep your anti-malware (Windows Defender) software active to protect your device. Regularly update your computer to ensure you have the latest security patches.
* **Deployment:** Do not deploy this application (host it on the internet) without thoroughly checking for security defects, vulnerabilities or other flaws.

## Prerequisites
To run this application, you will need:
* **Node.js** (LTS Version): Allows you to run JavaScript code outside of a web browser, such as to run a development server. You can download the installer by visiting `https://nodejs.org/` and clicking the green "Download Node.js (LTS)" button.
* **Code Editor:** A text editor to manipulate text. Visual Studio Code is recommended. You can download VS Code by visiting `https://code.visualstudio.com/` and clicking the blue "Download for Windows" (or your operating system) button. Run the installer that was downloaded to set up Visual Studio Code. Code editors help you catch mistakes early by highlighting code that may be incorrect.
* **Basic JavaScript Understanding:** This guide is written with the expectation that you have a basic understanding of JavaScript. You should be familiar with functions, variables, comments, and modules.
* **Basic React Understanding** (Recommended): If you're not familiar with React, or want additional reading, consider reviewing the short tutorial at `https://react.dev/learn` before you begin these instructions.

## Getting Started
Follow these steps to set up and run the weather application on your local machine.

### Step 1: Setup
1.  **Open your terminal application** (Command Prompt on Windows, Terminal on macOS, or your other favorite terminal app). The terminal lets us interact directly with the files on the computer and run programs that do not come with a user interface; `npm` is one of these programs.
2.  **Initialize a new React project** using `Vite` by entering the following and pressing enter. This process is known as "scaffolding" and will generate the necessary files and folders for your React app.

    ```bash
    npm create vite@latest my-weather --template react
    ```
3.  **Navigate into your project folder** and install dependencies. This changes the directory (`cd`) to `my-weather` and ensures that all the extra JavaScript code gets installed to run the development server and other internal tools.

    ```bash
    cd my-weather
    npm install
    ```
4.  **Start the development server**. This tells Node that you want to run the dev script, which will start the development server and make your web app available on your computer's web browser.

    Figure 3: Start the development server
    ```bash
    npm run dev
    ```
    You will see a URL like `http://localhost:5173/`. This is a special type of URL called a *loopback address*, which is NOT accessible on the internet. Only the computer running the development server can access the web app on `localhost`. **You must leave this window open to keep the development server running to access your web app**.
5.  **Open the URL (`localhost:5173`) in your web browser.** You should be presented with a page that says "Vite + React" and a few other things. This is the default template for a React app.
6.  **Using your code editor, open the `src` folder and select `App.jsx`**. Delete everything inside the `App` function so the file matches what is shown below. This file is the main component of your React app. It is where we will write all the code to fetch and display the weather data.

```javascript
    import React from "react";
    import "./App.css";

    function App() {
        return (
            <div className="App">
                <h1>My Weather App</h1>
            </div>
        );
    }

    export default App;
```
7.  **Open the `index.css` file** in the `src` folder and delete everything inside it. This file is the default stylesheet for your React app. We will not be using it, but you can add your own styles later if you want to change the look of the app.

### Step 2: Create State Variables
Create the state objects using the `useState()` hook. This hook creates a variable with the current value, and a function to update the value. We'll create four state objects. Rather than just use a simple variable such as `let` or `const` assignments, and update it, we are using React *state* because the values are likely to change throughout the lifecycle of the app. Soon, we'll make the app respond to state changes which require `useState` variables.

  ```javascript
    const [friendlyLocation, setFriendlyLocation] = React.useState("");
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const [forecast, setForecast] = React.useState(null);
  ```

### Step 3: Create Fetch Function
Let's create the function that gets the weather information. You can put the code shown below under the state definitions. This function uses `fetch` to query the National Weather Service API. Analyzing the function, we can see it does several different tasks. To start, if the `latitude` and `longitude` states are set, then the application uses the `fetch` function to request data. The URL is set to the `/points/latitude,longitude` endpoint. Then we pass some other parameters to the request. The first sets the request `method` to `GET` and the second sets a request header. An API can perform different actions depending on what type of "method" you set. The `method` indicates to the server what the endpoint should do with the information or the request. We use `GET` for our request because the desired effect is to "GET" or retrieve information from the server. Different APIs allow users to create or update resources; `POST` and `PUT` methods, respectively, are used for these request types. The second function parameter is an object that sets the `User-Agent` header to an organization name and contact information. This header is required by the National Weather Service as described in their API specifications. The next task for the algorithm is to extract the city and state from the HTTP response body and calls `setFriendlyLocation()` to set the new state value. Then it extracts the forecast link from the response body returned by the National Weather Service. The link is a URL to another API endpoint that can be queried for a detailed weather forecast. The application makes another HTTP request with `fetch` to that second endpoint and finally, it sets the `forecast` state variable to equal the data from the response payload. This entire function is wrapped in a `useCallback()` hook. This hook lets React cache the result of the function so it can be used after the page is remounted, such as after the page is refreshed. Cached content is much faster to load rather than waiting for another HTTP request process.

  ```javascript
    const getForecast = React.useCallback(async () => {
        if (latitude && longitude) {
            setForecast(null); // Reset forecast before new fetch
            try {
                const url = `https://api.weather.gov/points/${latitude},${longitude}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "User-Agent": "(kennesaw.edu, ccoop125@studente.kennesaw.edu)",
                    },
                });

                const json = await response.json();
                const forecastUrl = json.properties.forecast;
                const city = json.properties.relativeLocation.properties.city;
                const state = json.properties.relativeLocation.properties.state;

                setFriendlyLocation(`${city}, ${state}`);

                const forecastResponse = await fetch(forecastUrl, {
                    method: "GET",
                    headers: {
                        "User-Agent": "(your-domain.com, your-email@domain.com)",
                    },
                });
                const forecastData = await forecastResponse.json();
                setForecast(forecastData); // Set the forecast data in state
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }
    }, [latitude, longitude]);
  ```

### Step 4: Trigger Data Fetch
To use the previously defined callback function, we need to get the user's location and then start the `getForecast()` callback. We will do all of this in a `useEffect()` hook. The effect hook will trigger the enclosed function to run anytime a state in its dependency list is updated. Since the `useEffect()` hook makes use of the `getForecast()` function, it must be defined before calling it or using it as a dependency. First the hook checks if the browser is compatible with the `navigator API` (which gets the coordinates from the browser). If the application is granted permission by the user, it sets the `latitude` and `longitude` state variables with the appropriate setters. The API endpoint we are utilizing requires the user's coordinates, so we then check if the coordinate states have been set and if so, we call `getForecast()` to obtain the weather data.

  ```javascript
    React.useEffect(() => {
        // Check if the browser supports geolocation
        if (navigator.geolocation) {
            // Get the user's location from the browser
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
    }, [getForecast, latitude, longitude]);
   ```

### Step 5: Display Information
We have successfully set all the state information we need to show the weather data. Now we need to display the information to the user. In `JSX` this is very easy, anything that is returned from a React function is rendered by the browser. We can use ternary (`condition ? true : false`) operators to ensure that only state values that have values are displayed. We need to do this to prevent null-ish values from being rendered and a runtime error triggered. Consider the few seconds before the `forecast` state is set - the value will be `null`, so we cannot access any of its weather properties. All the available information returned by the HTTP requests are available to review on the National Weather Service's API specification, available for review at [api.weather.gov](https://api.weather.gov/). The properties we want to render from the `forecast` state are found in the `forecast.properties.periods` array. We render the first element in the array as the current conditions, and then display all the following in the forecast section.

  ```html
    return (
        <div className="App">
            {friendlyLocation && <h1>Weather in {friendlyLocation}</h1>}
            {forecast ? (
                <div className="card">
                    <div className="current-conditions">
                        <h2>Current Conditions</h2>
                        <p>
                            <strong>
                                {forecast.properties.periods[0].temperature}
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
                                    index > 0 && ( // Display all but the first period in the forecast list
                                        <li key={period.number} className="forecast-item">
                                            <strong>{period.name}</strong>
                                            <div className="item">
                                                <p>
                                                    {period.temperature}
                                                    {period.temperatureUnit} -{" "}
                                                    {period.detailedForecast}
                                                </p>
                                                {period.icon && (
                                                    <img
                                                        src={period.icon}
                                                        alt={period.shortDescription}
                                                        className="weather-icon"
                                                    />
                                                )}
                                            </div>
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="loading">Loading forecast...</p>
            )}
        </div>
    );
  ```

### Step 6: Add Stylesheet (Optional)
In its current state, the application is fully functional. If you return to your web browser and refresh the page the app will ask for your location and then show you the local weather forecast. We can improve the look of the application by adding some color and manipulating the layout. Adding a stylesheet can change the application appearance. CSS stands for *cascading stylesheets*, and it is used by the browser to change the look and feel of a web application. You should be familiar with CSS if you have created a vanilla JavaScript application, so we won't go into the details of this language. However, to "link" a stylesheet to a React app, we simply import the stylesheet by path; there is no need to add any `<script>` tags.

  ```javascript
    // At the top of your App.jsx file
    import "./App.css";
  ```

## Troubleshooting
Many things can go wrong when writing code. Check these common problems as first-line troubleshooting steps if something does not work properly. It is important to understand where error messages will be shown so you can properly diagnose the issue.

* **Console Errors:** To open the console, press the `F12` key on your keyboard, or right-click on the web page content and click the "Inspect" option in the context menu. This will open the developer panel. Finally, click the *Console* tab on the top of the new panel. Any errors raised by your application will be displayed in red.
* **'`vite`' or '`npm`' not recognized:** You have not installed the dependencies. Run `npm install` in your terminal/Command Prompt. You may have changed the default settings when installing `Node.js`; run the installer again choosing all the default settings.
* **`Uncaught ReferenceError`:** Something is likely misspelled. Check the relevant line and file from the error message in your code editor.
* **`This site can't be reached / localhost refused to connect`:** Your web development server is not running. Return to the console and run the command `npm run dev`. Leave the development server running.
* **`Error fetching weather data: TypeError: Cannot read properties of undefined`:** The National Weather Service API rejected an HTTP request. Ensure that the HTTP request is setting the `User-Agent` header and that you have updated its value with your own contact information. You can also review the "Request" tab of the developer panel to check for additional errors.
* **`Stuck on "Loading forecast..."`:** Ensure that you have granted the website permission to access your location. Also, check your OS settings to permit location access by web browser.

For more detailed troubleshooting, refer to the full instructions document or open an Issue on this GitHub repository.

## Contributing
If you find something that is incorrect in the code provided, feel free to create a pull request. If you encounter errors not covered by the troubleshooting guidelines, consider opening an Issue on GitHub repository to talk about it more with myself and the community.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file in this repository's root for details.

## Additional Resources
* **Fetch API Documentation:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* **Geolocation API Documentation:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
* **React Hooks Documentation:** [React Docs](https://react.dev/reference/react/hooks)
* **National Weather Service API Documentation:** [NWS API](https://api.weather.gov/docs/)
