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

To validate UK postcodes, I used postcode.js rather than writing complex regex, which helped keep the logic readable. For quick styling, I used Daisy UI with Tailwind to speed up layout and button styling.

### Limitations / known issues

Geolocation is partially implemented — latitude/longitude are not yet passed correctly to the API, resulting in 400/500 errors. Error handling and validation could be improved in edge cases.

## Future Improvements

1. Finish the Geolocation Implementation

I would debug why coordinates were not being passed correctly and ensure accurate parsing before sending to the weather API.

2. Enhance UI & Accessibility

I would improve the visual design with colour, icons, and spacing, while also making the interface screen-reader friendly.

3. Add Dark Mode

Libraries like @react-hooks-hub/use-dark-mode could provide quick theme toggling.

4. Display Forecast with a Temperature Chart

I’ve previously used something similar to react-chartjs-2 and would integrate it to make the forecast more visually engaging.

5. Add Testing (Unit + E2E)

I would use Jest for logic testing and Playwright for accessibility and responsive layout testing.