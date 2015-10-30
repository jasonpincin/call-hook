var test = require('tape'),
    hook = require('..'),
    pre  = require('../pre'),
    post = require('../post')

test('index should expose pre and post', function (t) {
    t.equal(hook.pre, pre, 'hook.pre = pre')
    t.equal(hook.post, post, 'hook.post = post')
    t.end()
})
