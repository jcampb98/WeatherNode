# WeatherNode

This is an application that was built as a take home test for SecuriGroup and the key features that were successfully built for this weather application were: Search (enter a town/city or a UK postcode), Current Weather that shows temperature, humidity, wind speed, a description of the weather, 5-day forecast that shows the temperature, Recents that keeps a list of previous searches.

## Setup

1. Clone the repository: 
    ```bash
    git clone https://github.com/jcampb98/WeatherNode.git
    cd <folder>

2. Install dependencies:
    ```bash
    npm install

3. Add any required enviroment variables in order to make it running correctly:
    ```ini
    e.g. OPEN_WEATHER_MAP_API_KEY=<your-api-key>

## Run

To start the project:
    ```bash
    npm run dev

## Decisions & Trade-offs

### Prioritizing Core Functionality Over UI

As this was my first time working with Next.js, I focused on implementing core functionality before styling.
I first built a proxy API route to securely handle OpenWeatherMap requests without exposing the API key. After that, I created a basic UI with a header and search form to test and iterate on functionality.

### Using Existing Libraries for Efficiency

To validate UK postcodes, I used postcode.js rather than writing complex regex, which helped keep the logic readable.
For quick styling, I used Daisy UI with Tailwind to speed up layout and button styling.

### Limitations / known issues

The Geolocation feature is currently incomplete — longitude and latitude are not being passed correctly to the API, resulting in 400/500 errors.

## Future Improvements

1. Finish the Geolocation Feature

if i was given a chance to finish the geolocation feature i would've investigated into why the latitude and longitude wasn't passing along to the API correctly or why my code wasn't correctly parsing it and throwing the error.

2. Improve the User Interface

i find the user interface to be pretty basic and bare since it has everything needed to work it but not what a website of this caliber should be and i would also add a lot of colour to it instead of it being just some purple, black & white and i would also add icons as well with colour to make it user friendly. i didn't have enough time to make the application to be web accessible either so i would accommodate that as well so that screen readers could access it and get the necessary information.

3. Add Dark Mode

I would've added Dark Mode as well since the application has a lot of white within it thats what i think would generally improve this application as there is React libraries that can make adding this feature easier such as '@react-hooks-hub/use-dark-mode'.

4. Add Simple chart for Temperatures

This is a feature that i have implemented before for a different application but there is a chart library that i would've add to this project which is 'react-chartjs-2' to display the difference of temperatures and make the application more interactive and better.