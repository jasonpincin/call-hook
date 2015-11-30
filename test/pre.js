var test = require('tape'),
    pre  = require('../pre')

test('pre should return a function with a callee property', function (t) {
  t.plan(2)

  var hooked = pre(callee, function () {})
  t.equal(typeof hooked, 'function', 'hooked is a function')
  t.equal(hooked.callee, callee, 'callee set')

  function callee () {}
})

test('pre should execute preCall before callee', function (t) {
  t.plan(2)

  var preCalled    = false,
      calleeCalled = false

  pre(callee, function () {
    preCalled = true
    t.equal(calleeCalled, false, 'callee not called before preCall')
  })()

  function callee () {
    calleeCalled = true
    t.equal(preCalled, true, 'preCall called before callee')
  }
})

test('pre should not alter callee args by default', function (t) {
  t.plan(18)

  var args = ['hello', 'world']
  pre(callee, function () { return 1 }).apply(undefined, args)
  pre(callee, function () { return [1, 2, 3] }).apply(undefined, args)
  pre(callee, function () { return {} }).apply(undefined, args)
  pre(callee, function () { return true }).apply(undefined, args)
  pre(callee, function () { return false }).apply(undefined, args)
  pre(callee, function () { return undefined }).apply(undefined, args)

  function callee () {
    t.equal(arguments.length, 2, 'arguments.length = 2')
    t.equal(arguments[0], 'hello', 'arg 0 = hello')
    t.equal(arguments[1], 'world', 'arg 1 = world')
  }
})

test('pre should alter callee args if setArguments is called', function (t) {
  t.plan(3)

  pre(callee, function () {
    this.setArguments(42, 'pencil')
  })('this', 'is', 1, 'test')

  function callee () {
    t.equal(arguments.length, 2, 'arguments.length = 2')
    t.equal(arguments[0], 42, 'arg[0] = 42')
    t.equal(arguments[1], 'pencil', 'arg[1] = pencil')
  }
})

test('pre hookedFunc returnValue is callee returnValue', function (t) {
  t.plan(2)

  t.equal(pre(callee, function () { return 'hi' })(), 42, 'returnValue = 42')
  t.equal(pre(callee, function () {})(), 42, 'returnValue = 42')

  function callee () {
    return 42
  }
})

test('pre abort prohibits call to callee', function (t) {
  t.plan(1)

  var returnValue = pre(callee, function () {
    this.abort('interrupted!')
  })()

  t.equal(returnValue, 'interrupted!', 'returnValue = interrupted!')

  function callee () {
    t.fail('callee should not be called')
    return true
  }
})

test('pre abort does not prohibit subsequent calls', function (t) {
  t.plan(5)

  var showEvens = pre(callee, filterOdd)

  t.equal(showEvens(0), 0)
  t.equal(showEvens(1), undefined)
  t.equal(showEvens(2), 2)
  t.equal(showEvens(3), undefined)
  t.equal(showEvens(4), 4)

  function filterOdd (number) {
    if (number % 2 === 1) this.abort()
  }

  function callee (number) {
    return number
  }
})
