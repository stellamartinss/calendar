<div align="center">
    <img src="https://storage.googleapis.com/public-jobsity-bucket/jobsity_logo_small.png"/>
</div>

# Angular Challenge

## Description

This project is designed to test your knowledge of front-end web technologies and assess your ability to create front-​end UI products with attention to details, cross-browser compatibility, standards, and  reusability.

## Assignment

The goal of this exercise is to create a demo calendar application using Angular.

You should start by rendering a single month view of a calendar for the current month, along the lines of the illustration below:
<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/CalendarSample.png"/>
</div>

## Mandatory features
 - Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.
 - Ability to edit reminders - including changing text, city, day and time.
 - Add a weather service call from [OpenWeather](https://openweathermap.org/forecast16) and get the weather forecast (e.g. Rain) for the date of the calendar reminder based on the city.

## Bonus (Optional)

- Expand the calendar to support more than the current month or year.
- Properly handle overflow when multiple reminders appear on the same date.
- Unit test the functionality: *Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.*

## Considerations

 - The project is completely focused on Front-end. Ignore the Back-end.
 - Create your Calendar using the route `/calendar`
 - Feel free to use small helper libraries for:
 -- UI Elements.
 -- Date/Time handling.
 - **You must create the calendar component yourself**. Do not user calendar libraries like FullCalendar or Bootstrap Calendar.
 - Provide working API keys to any external API you use.
 - Show us your capabilities on CSS and styling, if possible.


## Development server

Run `npm start`, than run `npm run json-server` so the api can run too.

Navigate to `http://localhost:4200/`.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io). 

PS.: the use test `ReminderFormComponent > should create a reminder`  is not working because the id is set by the current date and time, it also take on count the seconds, so when it is generated and then tested in general one second passed and this is the difference between them. The same is occuring with `WeatherService > should be created` test. If I had some more time I would do this improvement.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
