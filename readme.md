Calendar Model
==================

[![Greenkeeper badge](https://badges.greenkeeper.io/joe-crick/calendar-model.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/joe-crick/calendar-model.svg?branch=master)](https://travis-ci.org/joe-crick/calendar-model)
[![GitHub license](https://img.shields.io/github/license/Day8/re-frame.svg)](license.txt)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)
![Current Version](https://img.shields.io/badge/version-0.0.1-green.svg)


CALENDAR MODEL IS CURRENTLY IN ALPHA/ACTIVE DEVELOPMENT.

Calendar Model models calendrical data. To over simplify it, it generates sets of Date objects. Each Date object
corresponds to a calendar day. Date objects decorate a JS Date instance with a few convenience methods, and an events property. The events property is an array that can contain an arbitrary collection of events. 

Calendar Model is very small. If you were to bundle and minify it, it would only be around ~ 14kb. However, it doesn't come as a monolithic bundle. You import only what you want/need.

### Install from NPM

```
yarn add calendar-model
```
or
```
npm i calendar-model -S
```

## Get Started

You can view an example React app that uses `calendar-model` here [Calendar Model Demo](https://github.com/joe-crick/calendar-model-example).

### Setting up the Model

Calendar Model receives requests for date ranges, and returns sets (Array) of Day objects that correspond to those date ranges. For example, a request for two weeks, using the default week setting, would return a set of 14 Day 
objects. 

#### Create a Basic Month-based Calendar, Without Events

```js
export default function getCalendarMonth({date});
```

#### Create a Basic Month-based Calendar that has Events

```js
export default function initCalendar(calendarData) {

    // Creates a stateful function that maps events to days
    const getEvents = makeEventFinder(calendarData);

    return function getMonth(date) {
        return getCalendarMonth({date, getEvents});
    }

}
```

#### Create a Week-based Calendar, Without Events

```js
export default function getNWeeks({date, numOfWeeks});
```

#### Create a Week-based Calendar that has Events

```js
export default function initCalendar(calendarData) {

    // Creates a stateful function that maps events to days
    const getEvents = makeEventFinder(calendarData);

    return function getMonth(date, numOfWeeks) {
        return getNWeeks({date, getEvents, numOfWeeks});
    }

}
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

The compiled, minified JS will be located in the `dist` folder. Docs are also built. Docs are located in the `doc` folder.

