# strawpoll.js
Strawpoll library for NodeJS



Usage:
======

`npm install strawpoll.js`


Both methods return a promise which resolves to a [poll object](https://github.com/strawpoll/strawpoll/wiki/API).


Getting a poll's information
------
`strawpoll.get(ID)` **returns promise..resolves to object**
```js
const strawpoll = require("strawpoll.js");
strawpoll.get(1).then(poll=>console.log(poll));
```

Making a poll
------
`strawpoll.make(options);` **returns promise..resolves to object**
```js
const strawpoll = require("strawpoll.js");
strawpoll.make({title: "Testing?", options: ["A", "B", "C"], multi: true, dupcheck: "normal", captcha: true}).then(poll=>console.log(poll));
```
