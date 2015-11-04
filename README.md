# call-hook

[![NPM version](https://badge.fury.io/js/call-hook.png)](http://badge.fury.io/js/call-hook)
[![Build Status](https://travis-ci.org/jasonpincin/call-hook.svg?branch=master)](https://travis-ci.org/jasonpincin/call-hook)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/call-hook/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/call-hook?branch=master)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/jp-project3.svg)](https://saucelabs.com/u/jp-project3)

Hook function calls. 

Prehooks execute before the callee (aka target) function executes and may 
alter the arguments sent to the callee or abort callee execution, while 
posthooks execute after the callee function, receive the same arguments 
as the callee, and may also access it's return value.

## example

```javascript
var pre  = require('call-hook/pre'), // or require('call-hook').post
    post = require('call-hook/post') // or require('call-hook').pre

function hello (name) {
    console.log('hello ' + name)
}

var quickVisit = post(hello, function goodbye (name) {
    console.log('goodbye ' + name)
})

var shakeGreet = pre(hello, function handshake () {
    console.log('handshake')
})

hello('Jason') // hello Jason

console.log('\n')

quickVisit('Jason') // hello Jason
                    // goodbye Jason

console.log('\n')

shakeGreet('Jason') // handshake
                    // hello Anonymous
```

## api

```
var pre  = require('call-hook/pre'), // or require('call-hook').post
    post = require('call-hook/post') // or require('call-hook').pre
```

### hookedFunc = pre(callee, preCall)

Returns a new function, `hookedFunc`, which when called executes the `preCall` 
function prior to executing the `callee` function. Normally, both functions 
receive the arguments supplied to `hookedFunc`, and the return value of
`hookedFunc` is the return value of `callee`. This behaviour may be changed (see
precall context below). The `callee` function is executed in an undefined context,
while the `preCall` function is executed in the context of an object that offers 
the following:

*preCall context:*
* `abort(returnValue)` - prevent the `callee` function from being executed and
  set the return value of `hookedFunc` to `returnValue`
* `setArguments(arg1, arg2, ...)` - supply the given arguments to `callee`
  instead of the arguments supplied to `hookedFunc`

Example of altering arguments being sent to `callee`:

```javascript
var pre  = require('call-hook/pre')

function roll (sides) {
    return Math.ceil(Math.random() * sides)
}

var rollD10 = pre(roll, function d10 () {
    this.setArguments(10)
})

console.log('10-sided die roll result: ' + rollD10())
```

Example of aborting:

```javascript
var pre  = require('call-hook/pre')

function roll (sides) {
    return Math.ceil(Math.random() * sides)
}

// hijack roll, if a 20 sided die is requested, always return 20
var roll = pre(roll, function loadedD20 (sides) {
    if (sides === 20) return this.abort(20)
})

console.log('10-sided die roll result: ' + roll(10)) // 1 - 10
console.log('20-sided die roll result: ' + roll(20)) // always 20
```

### hookedFunc = post(callee, postCall)

Returns a new function, `hookedFunc` which executes the `callee` function, followed 
by the `postCall` function. The return value of `hookedFunc` is the return value
of the `postCall` function. The `postCall` context may be used to return the
`callee` return value (see below).  Both functions receive the same arguments passed to 
`hookedFunc`. The `callee` function is executed in an `undefined` context, while 
the `postCall` is executed in the context of an object that offers the following:

*postCall context:*
* `returnValue` - contains the return value of the `callee` function

Example of accessing previous return value:

```javascript
var post = require('call-hook/post')

function roll (sides) {
    return Math.ceil(Math.random() * sides)
}

var printDieRoll = post(roll, function print (sides) {
    console.log(sides + '-sided die roll result: ' + this.returnValue)
    return this.returnValue
})

printDieRoll(6)
```


## install

With [npm](https://npmjs.org) do:

```
npm install --save call-hook
```

## testing

`npm test`

Or to run tests in phantom: `npm run phantom`

### coverage

`npm run view-cover`

This will output a textual coverage report.

`npm run open-cover`

This will open an HTML coverage report in the default browser.
