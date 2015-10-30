# call-hook

[![NPM version](https://badge.fury.io/js/call-hook.png)](http://badge.fury.io/js/call-hook)
[![Build Status](https://travis-ci.org/jasonpincin/call-hook.svg?branch=master)](https://travis-ci.org/jasonpincin/call-hook)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/call-hook/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/call-hook?branch=master)

Hook function calls with other functions. 

Prehooks execute before the callee (aka target) function executes and may 
alter the arguments sent to the callee function. Posthooks execute after the 
callee function, receive the same arguments as the callee function, and may 
also access it's return value.

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

Returns a new function, `hookedFunc`, which executes the `preCall` function 
prior to executing the `callee` function. If `preCall` returns an `Array`, then 
that array will be applied to `callee` as arguments, otherwise both `preCall` 
and `callee` functions will receive the arguments of the `hookedFunc` function 
call. Both functions are executed in an `undefined` context. The return value of 
the `hookedFunc` function call will be the return value of `callee`.

Example of altering arguments being sent to `callee`:

```javascript
var pre  = require('call-hook/pre')

function roll (sides) {
    return Math.ceil(Math.random() * sides)
}

var rollD10 = pre(roll, function d10 () {
    return [10]
})

console.log('10-sided die roll result: ' + rollD10())
```

### hookedFunc = post(callee, postCall)

Returns a new function, `hookedFunc` which executes the `callee` function, followed 
by the `postCall` function. Both functions receive the same arguments passed to 
`hookedFunc`. The `callee` function is executed in an `undefined` context, while 
the `postCall` is executed in the context of an object that offers `previousReturnValue`, 
which may be used to access the return value of the `callee` function. The
return value of `hookedFunc` is the return value of `postCall`. If you do not
wish to alter the return value of `callee`, then it's important to return
`this.previousReturnValue` in `postCall`.

Example of accessing previous return value:

```javascript
var post = require('call-hook/post')

function roll (sides) {
    return Math.ceil(Math.random() * sides)
}

var printDieRoll = post(roll, function print (sides) {
    console.log(sides + '-sided die roll result: ' + this.previousReturnValue)
    return this.previousReturnValue
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
