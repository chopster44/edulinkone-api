# Edulinkone-api
---
> A custom-built unofficial api for OvernetData's Edulinkone for use in my future projects.

The api offers a documented, easy way to use the publicly undocumented API for Edulink. This is not made by OvernetData
and this library may become un-usable if anything changes.

The `Edulink` class is used to access the api. It returns near to raw data returned from edulink.
`EdulinkTypes` has the classes used internally by the library and can be used for interacting with the library.

## Installation
---
``` $ npm install edulinkone-api ```

## Example Usage
---
Import the module:
```ts
import { Edulink } from "edulinkone-api";
```

Import the types:
```ts
import {EdulinkTypes} from "edulinkone-api";
```

Create an API instance:
```ts
const edulink = new Edulink;
```

Authenticate :
```ts
await edulink.Authenticate({data: {
        establishment_id: 1,
        password: "Password123",
        username: "example123",
    }}
);
```

Get Timetable:
```ts
await edulink.getTimetable({data:  {
        date: (new Data()).toISOString().split('T')[0],
        learner_id: "123",
    }}
);
```

Get Homework:
```ts
await edulink.getHomework({data: {
	format: 1,
    }}
);
```