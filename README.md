# Edulinkone-api

> A custom-built unofficial api for OvernetData's Edulinkone for use in my future projects.

The api offers a documented, easy way to use the publicly undocumented API for Edulink. This is not made by OvernetData
and this library may become un-usable if anything changes.

The `Edulink` class is used to access the api. It returns near to raw data returned from edulink.
`EdulinkTypes` has the classes used internally by the library and can be used for interacting with the library.

## Installation

```bash
$ npm install edulinkone-api 
```

## Docs

*note* most of the functions have to be run from inside an async function because of how `fetch()` works.

### Import the module & types:
```ts
import { Edulink, EdulinkTypes } from "edulinkone-api";
```

### Create an API instance:
```ts
const edulink = new Edulink("exampleSchool", "username123", "Password123", 1);
```
The constructor takes the schoolId, username, password and establishment_id.
The schoolId is the part of the web address which goes before ".edulink.com", e.g. "school.edulinkone.com".
The username and password are as suggested.
The establishment_id is the number used by the edulink api(*).

When you create an instance it does not log into edulink. So you need to run:
```ts
await edulink.Authenticate();
```
No arguments are required as they are collected on the creation of a instance.


### Get Timetable:
There are three ways to get the timetable data, `getRawTimetable`, `getThisWeek` and `getToday`.

```ts
await edulink.getRawTimetable({ data: {
	    date: (new Date).toISOString().split('T')[0],
        learner_id: "123"
    } 
});
```
The function `getRawTimetable()`, takes the current date and the learner id in the format of `RawTimetableParams` and 
returns data as `RawTimetableResult`.

```ts
await edulink.getThisWeek();
```
The function `getThisWeek()`, returns the week edulink classes as `"current"` in the format of `Week`.

```ts
await edulink.getToday()
```
The function `getToday()`, returns the day edulink classes as `"current"` in the format of `Day`.

### Get Homework:
There are also three ways to get data from the homework list, `getRawHomework()`, `getCurrentHomework()` and 
`getPastHomework`.

```ts
await edulink.getRawHomework({ data: {
	    format: 1
    } 
});
```
The function `getRawHomework()`, takes a format(*) and returns in the type `RawHomeworkResult`.

```ts
await edulink.getCurrentHomework();
```
The function `getCurrentHomework()`, returns all current homework in the type `HomeworkResult`.

```ts
await edulink.getCurrentHomework();
```
The function `getPastHomework()`, returns all past homework in the type `HomeworkResult`.

## Other info
(*) - if this symbol is used then the functionality of the feature being talked about is not fully known.
