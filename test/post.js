var test = require('tape'),
    post = require('../post')

test('post should execute postCall after callee', function (t) {
    t.plan(2)

    var postCalled   = false,
        calleeCalled = false

    post(callee, function () {
        postCalled = true
        t.equal(calleeCalled, true, 'callee called before postCall')
    })()

    function callee () {
        calleeCalled = true
        t.equal(postCalled, false, 'postCall not called before callee')
    }
})

test('post should be called with same args as callee', function (t) {
    t.plan(2)

    post(callee, function (arg1) {
        t.equal(arg1, 42, 'arg1 = 42')
    })(42)

    function callee (arg1) {
        t.equal(arg1, 42, 'arg1 = 42')
    }
})

test('post should have access to previous return value', function (t) {
    t.plan(1)

    post(callee, function () {
        t.deepEqual(this.returnValue, { val: true }, 'this.returnValue is present')
    })()

    function callee () {
        return { val: true }
    }
})

test('post hookedFunc should return postCall returnValue', function (t) {
    t.plan(1)

    var returnValue = post(callee, function () {
        return 'hi'
    })()

    t.equal(returnValue, 'hi', 'returnValue = hi')

    function callee () {
        return 42
    }
})
