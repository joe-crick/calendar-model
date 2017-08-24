Calendar Model
==================

[![Greenkeeper badge](https://badges.greenkeeper.io/joe-crick/calendar-model.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/joe-crick/calendar-model.svg?branch=master)](https://travis-ci.org/joe-crick/calendar-model)
[![GitHub license](https://img.shields.io/github/license/Day8/re-frame.svg)](license.txt)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)
![Current Version](https://img.shields.io/badge/version-0.0.1-green.svg)

# TOC

* [Install from NPM](#InstallfromNPM)
* [Get Source](#GetSource)
* [Installing](#Installing)
* [Compile](#Compile)
* [Basic Use](#BasicUse)
    * [Define the Model](#DefinetheModel)
    * [Define an Event Binder](#DefineanEventBinder)
    * [Define the Data's Presentation](#DefinetheDatasPresentation)
* [Helper Methods](#HelperMethods)

# Simple Calendar Data

NOTE: For full details, see the [online API docs](https://joe-crick.gitbooks.io/calendar-model/content/)

The idea behind Calendar Model is simple: Make it easy to get and work with calendrical data. Calendar Model only cares about the data. It leaves the presentation of the data up to you. In addition, while Calendar Model provides default implementations for all its functionality, you can override most of the defaults.

Calendar Model is implemented as a set of functions. These functions can be queried to return result sets. Each result set contains a collection \(Array\) of `Day` objects.

> A `Day` object is a decorated JS `Date`. It extends `Date` with a few convenience methods, and an `events` property.
>
> An `event` is an arbitrary set of data \(Array\) associated with a `Day`.

Calendar Model conforms to the following pattern:

--> Input: Date
--> Output: Day

Calendar Model exposes functions that return the following categories of result sets:

* Month \(by default 5 weeks\)
* Week \(by default 7 days\)
* Day

Month and Week expose functions that can create two types of `sets`:

* Flat: A one-dimensional Array
* Nested: A two-dimensional Array. Nested `sets` are useful when you want a collection of Week `sets`.

Day queries only return Flat sets.

Calendar Model is really small. It also has no external dependencies.


###  1. <a name='InstallfromNPM'></a>Install from NPM

```
yarn add calendar-model
```
or
```
npm i calendar-model -S
```

###  2. <a name='GetSource'></a>Get Source

```
git clone https://github.com/joe-crick/calendar-model.git
```

###  3. <a name='Installing'></a>Installing

Once you've cloned the repo, install dependencies

```
yarn
```
or
```
npm i
```

###  4. <a name='Compile'></a>Compile

To compile Calendar Model, run:

```
npm run build
```

The build transpiles the JS, and creates docs. The transpiled JS will be located in the `lib` folder. Docs are located in the `docs` folder.

###  5. <a name='BasicUse'></a>Basic Use

A basic calendar can be created with the following steps:

1. Define the model
2. Define an Event Binder \(optional\)
3. Define the data's presentation

Consult the [sample application](https://github.com/joe-crick/calendar-model-example) to see a working example of Calendar Model.

####  5.1. <a name='DefinetheModel'></a>Define the Model

Because Calendar Model is a collection of functions, there are a number of ways you can define a
given implementation of Calendar Model. You only need to include those functions you will be
using in your application. You can use them as stand-alone functions, or add them as methods
to an object. Below are a few examples:

##### Create a Week-based Calendar, without Events

```js
// @return {Array<Day>}
export default function getNWeeks({date, numOfWeeks});
```

##### Create a Week-based Calendar that has Events

```js
// @return {Function}
export default function initCalendar(calendarData) {

    // makeEventFinder returns a stateful function that has access to calendarData
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

####  5.2. <a name='DefineanEventBinder'></a>Define an Event Binder

Each `Day` in a result set returned by Calendar Model contains an `events` property. The
`events` property can store an arbitrary set \(Array\) of data. Event data lives outside of
the Calendar Model, and is one-way, one-time bound to `Day`s.

Event binding occurs when a `Day` is created. The constructor calls the `getEvents` function to
populate the contents of the event. The output of the `getEvents` function is assigned to the
events property of the `Day`. In Calendar Model's default `getEvents` implementation, the `Day`s
`Date` instance is passed as an argument to the `getEvents` function, which returns an array of
events for that day.

For example, given the following event data format:

```js
{ 
    '01/02/2017': [{time: '9:00', title: 'My Event' }]
}
```

The following Event Binder would bind events to the appropriate days:

```js
function makeEventFinder(eventData){
    return function getEvents(date) {
        return eventData[format(date)] || [];
    };
}
```

The above code is, in fact, Calendar Model's default Event Binder, which can be overridden.

####  5.3. <a name='DefinetheDatasPresentation'></a>Define the Data's Presentation

You can present the calendar data in whatever format you like. Below is an example of rendering a
 month-based calendar using JSX (when presenting tabular data for multiple weeks, a nested
 result set is recommended):

```js
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
                            </div>
                        </td>);
                    })}                                             
            </tr>);
        })}
    </tbody>
</table>
```

###  6. <a name='HelperMethods'></a>Helper Methods

Calendar Model exposes several helper methods:

* `formatDate`: Formats a date in International format \(DD/MM/YYYY\).
* `monthNameFinder`: Returns the text name for a given month.
* `weekDayNameFinder`: Returns the text name for a given week.
* `getNextWeekDay`: Given a seed date, returns a Day 7 days in the future.
* `getPrevWeekDay`: Given a seed date, returns a Day 7 days in the past.
