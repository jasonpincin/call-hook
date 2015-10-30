var pre  = require('../pre'), // or require('..').post
    post = require('../post') // or require('..').pre

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
