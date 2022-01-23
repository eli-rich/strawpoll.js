# Strawpoll.js
A simple library for working with [strawpoll.com](https://strawpoll.com)

- [Strawpoll.js](#strawpolljs)
- [Installation](#installation)
- [Usage](#usage)
  - [`poll.get(<poll-id>)`](#pollgetpoll-id)
  - [`poll.make(<poll-options>)`](#pollmakepoll-options)
  - [`poll.delete(<poll-id>)`](#polldeletepoll-id)


# Installation
```sh
npm i strawpoll.js
```
# Usage
Some methods require an [API key](https://strawpoll.com/en/api-docs/authentication/).
```js
import Strawpoll from "strawpoll.js";
const poll = new Strawpoll("<api key>");
```
## `poll.get(<poll-id>)`
```js
let result = await poll.get("<poll-id>");
console.log(result.title);
```

---

## `poll.make(<poll-options>)`
```js
let newPoll = {
    title: "",
    answers: [],
    priv: false, // is private poll?
    co: true, // Allow comments?
    ma: false, // Allow multiple answers?
    mip: false, // Allow multiple answers per IP?
    enter_name: false, // Still under development: https://strawpoll.com/en/api-docs/create-poll/
    deadline: undefined, // Datetime of deadline in zulu (UTC) time.
    only_reg: false, // Force voters to be registered?
    vpn: false, // Allow VPN users to vote?
    captcha: true, // Require captcha?
    pin: false // Generate pin for live poll?
};
newPoll.title = "Test";
newPoll.answers = ["1", "2,"];
newPoll = await poll.make(newPoll);
if (newPoll.success === 1)
    console.log(await poll.get(newPoll.content_id));
```

---
## `poll.delete(<poll-id>)`
Note: requires a valid API key.
```js
const poll = new Strawpoll("<api-key>");
let newPoll = {
    title: "test_delete",
    answers: ['1', '2', '3', '4', '5']
}
newPoll = await poll.make(newPoll);
if (newPoll.success === 1)
    await poll.delete(newPoll.content_id);
```
