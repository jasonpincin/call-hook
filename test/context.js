var test = require('tape'),
    post = require('../post'),
    pre  = require('../pre')

test('post provides context', function (t) {
  t.plan(2)

  var obj = {
    f: post(callee, function () {
      t.equal(this.context, obj, 'as this.context for postCall')
    })
  }
  obj.f()

  function callee () {
    t.equal(this, obj, 'as this for callee')
  }
})

test('pre provides context', function (t) {
  t.plan(2)

  var obj = {
    f: pre(callee, function () {
      t.equal(this.context, obj, 'as this.context for preCall')
    })
  }
  obj.f()

  function callee () {
    t.equal(this, obj, 'as this for callee')
  }
})
