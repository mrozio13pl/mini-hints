# mini-hints ☄️

#### A better looking logs ✨

<img src="https://raw.githubusercontent.com/mrozio13pl/mini-hints/main/preview.png" alt="Log examples">

```js
const logger = require("mini-hints");

logger.success("This is a success message!");
logger.info("This is an info message!");
logger.event("This is an event message!");

// ...
```

## Error handling

```js
logger.error("Looks like we got an error", new Error("An error occurred!"));
```

#### Output:

```
19:36:56 🚨 error Looks like we got an error An error occurred!
Error: An error occurred!
    at ...
```

## Object handling

```js
logger.log("This is some JSON object:", { foo: { bar: { baz: "qux" } } });
```

#### Output:

```
20:17:31 This is some JSON object <Object(1)> { foo: <Object(1)> { bar: <Object(1)> { baz: qux } } }
```

## Defining log functions

```js
// logger.define('function name', options)
logger.define("notify", { 
    label: "notification",
    color: "blue",
    prefix: "🔔",
    replace: false
});
logger.notify("This is a notification!");
```

#### Output:
```
23:39:21 🔔 notification This is a notification!
```
#### Options (optional)
- `label`: A string that will be used as the label for the logging function. If not provided, the function name will be used as the label.
- `color`: A string that specifies the color to be used for the label in the console output. This should be a string that corresponds to one of the color functions provided by **chalk**. This defaults to `gray`.
- `prefix`: A string that will be displayed before the label in the console output. This defaults to an empty string.
- `replace`: A boolean value that determines whether the new logging function should replace an existing function with the same name. This defaults to `false`.

## More examples

```js
logger.success("Successful array:", [1, 2, 3, 4]);
logger.debug("Simple map example:", new Map().set("username", "coolusername"));
logger.stats("Coordinates", [
  { x: 10, y: 20 },
  { x: 30, y: 40 },
]);
logger.network({
  request: "GET /api/data",
  response: { status: 200, data: "..." },
});
logger.security("User logged:", new Date());
logger.log("warn", { data: [1, 2, 3], message: "Warning: low disk space" });
logger.fatal("uh oh...", new Error("Database connection failed"));
logger.array([1, 2, 3, 4]);
logger.json({ a: 1, b: "two" }); // JSON.stringify
```

#### Output:

```
21:11:20 🎉 success Successful array: <Array(4)> [ 1, 2, 3, 4 ]
21:11:20 🐞 debug Simple map example: <Map(1)> { username => coolusername }
21:11:20 📊 stats Coordinates <Array(2)> [ <Object(2)> { x: 10, y: 20 }, <Object(2)> { x: 30, y: 40 } ]
21:11:20 🌐 network <Object(2)> { request: GET /api/data, response: <Object(2)> { status: 200, data: ... } }
21:11:20 🔒 security User logged: 2023-03-28 21:11:20
21:11:20 ⚠️ warn <Object(2)> { data: <Array(3)> [ 1, 2, 3 ], message: Warning: low disk space }
21:11:20 💥 fatal uh oh... Database connection failed
Error: Database connection failed
    at ...
21:11:20 1, 2, 3, 4
21:11:20 {
  "a": 1,
  "b": "two"
}
```
