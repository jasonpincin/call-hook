var test = require('tape'),
    pre  = require('../pre')

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

test('pre should not alter callee args if non-array is returned', function (t) {
    t.plan(15)

    var args = ['hello', 'world']
    pre(callee, function () { return 1 }).apply(undefined, args)
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

test('pre should alter callee args if it returns an array', function (t) {
    t.plan(3)

    pre(callee, function () { return [42, 'pencil'] })('this', 'is', 1, 'test')

    function callee () {
        t.equal(arguments.length, 2, 'arguments.length = 2')
        t.equal(arguments[0], 42, 'arg[0] = 42')
        t.equal(arguments[1], 'pencil', 'arg[1] = pencil')
    }
})

test('pre hookedFunc returnValue is callee returnValue', function (t) {
    t.plan(1)

    var returnValue = pre(callee, function () {
        return 'hi'
    })()

    t.equal(returnValue, 42, 'returnValue = 42')

    function callee () {
        return 42
    }
})
