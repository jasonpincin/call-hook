var post = require('../post')

function roll (sides) {
  return Math.ceil(Math.random() * sides)
}

var printDieRoll = post(roll, function print (sides) {
  console.log(sides + '-sided die roll result: ' + this.returnValue)
  return this.returnValue
})

printDieRoll(6)
