Calendar Model
==================

[![Greenkeeper badge](https://badges.greenkeeper.io/joe-crick/calendar-model.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/joe-crick/calendar-model.svg?branch=master)](https://travis-ci.org/joe-crick/calendar-model)
[![GitHub license](https://img.shields.io/github/license/Day8/re-frame.svg)](license.txt)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)
![Current Version](https://img.shields.io/badge/version-0.0.1-green.svg)


# Calendar Model: Simple Calendar Data

The idea behind Calendar Model is simple: Make it easy to get and work with calendrical data. Calendar Model  only cares about the data, leaving the presentation of the data up to you.

Calendar Model generates Sets \(Arrays\) of `Day` objects. A `Day` object is a decorated JS `Date`. It extends `Date` with a few convenience methods, and an `events` \(Array\) property.

Calendar Model can create two types of `sets`:

* Flat: A one-dimensional Arr
* Nested: A two-dimensional Array. Nested `sets` are useful when you want a collection of Week `sets`.

Day queries only return Flat sets.

An `event` is an arbitrary set of data associated with a `Day`.Calendar Model comes with a default event binder, or you can provide your own. You can create calendars with, or without, events.


### Install from NPM

```
yarn add calendar-model
```
or
```
npm i calendar-model -S
```

### Get Source

```
git clone https://github.com/joe-crick/calendar-model.git
```

### Installing

Once you've cloned the repo, install dependencies

```
yarn
```
or
```
npm i
```

### Compile

To compile Calendar Model, run:

```
npm run build
```

The build transpiles the JS, and creates docs. The transpiled JS will be located in the `lib` folder. Docs are located in the `doc` folder.


### Basic Use

A basic calendar can be created with the following steps:

1. Define the model
2. Define an Event Binder \(optional\)
3. Define the data's presentation

Consult the [sample application](https://github.com/joe-crick/calendar-model-example) to see a working example of Calendar Model.

#### Define the Model

Because Calendar Model is a collection of functions, there are a number of ways you can define a given implementation of Calendar Model. You only need to include those functions you will be using in your application. You can use them as stan-alone functions, or add them as methods to an object. Below are a few examples:

##### Create a Week-based Calendar, without Events

```js
// @return {Array<Day>}
export default function getNWeeks({date, numOfWeeks});
```

##### Create a Week-based Calendar that has Events

```js
// @return {Function}
export default function initCalendar(calendarData) {

    // makeEventFinder returns a function
    const getEvents = makeEventFinder(calendarData);

    // @return {Array<Day>}
    return function getMonth(date, numOfWeeks) {
        return getNWeeks({date, getEvents, numOfWeeks});
    }

}
```

The same pattern used to return a week--based calendar, can be used to create a day-based calendar:

##### Create a Day-based Calendar, without Events

```js
// @return {Array<Day>}
export default function getNDays({date, numOfWeeks});
```

There is also a Month-based convenience method, which returns five weeks by default:

##### Create a Month-based Calendar, without Events

```js
// @return {Array<Day>}
export default function getMonth({date});
```

#### Define an Event Binder

Each `Day` in a result set returned by Calendar Model contains an `events` property. The `events` property can store an arbitrary set \(Array\) of data. Event data lives outside of the Calendar Model, and is merged in to `Day`s when a result set is generated.

For example, given the following event data format:

```js
{ 
    '01/02/2017': [{time: '9:00', title: 'My Event' }]
}
```

The following Event Binder module would associate events with the appropriate days:

```js
function makeEventFinder(eventData){
    return function getEvents(date) {
        return eventData[format(date)] || [];
    };
}
```

The above is, in fact, Calendar Model's default Event Binder, which can be overridden.

#### Define the Data's Presentation

You can present the calendar data in whatever format you like. Below is an example of rendering a month-based calendar using JSX:

```jsx
<table className="calendar-example">
    <TableHead />
    <tbody>
        {props.calendarDays.map((week, index) => {
            return (
                <tr key={index} className="week">
                    {week.map((day, idx) => {
                        return (
                        <td key={idx} className={getDayClassName(day, props.month)}>
                            <div className="day-contents">
                                <h3>{day.dayOfMonth}</h3>
                                <ul className="events">
                                {day.events.map((ev, idx) => {
                                    return (
                                        <li key={idx}>
                                            {ev.time}: {ev.title}
                                        </li>
                                    )
                                })}
                                </ul>
                            </div >
                        </td>);
                    })}                                             
            </tr>);
        })}
    </tbody>
</table>
```

### Helper Methods

Calendar Model exposes several helper methods, which it also uses internally:

* `formatDate`: Formats a date in International format \(DD/MM/YYYY\).
* `monthNameFinder`: Returns the text name for a given month.
* `weekDayNameFinder`: Returns the text name for a given week.
* `getDateInFollowingWeek`: Given a seed date, returns a date 7 days in the future.