var pre  = require('../pre')

function roll (sides) {
  return Math.ceil(Math.random() * sides)
}

var rollD10 = pre(roll, function d10 () {
  this.setArguments(10)
})

console.log('10-sided die roll result: ' + rollD10())
