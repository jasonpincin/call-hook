var pre  = require('../pre')
var post = require('../post')

function roll (sides) {
  return Math.ceil(Math.random() * sides)
}

var printDieRoll = post(roll, function print (sides) {
  console.log(sides + '-sided die roll result: ' + this.returnValue)
})

var printD10Roll = pre(printDieRoll, function d10 () {
  this.setArguments(10)
})

printD10Roll()
