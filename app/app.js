
const express = require('express')
const app = express()
const port = 3000
var number = []

function random() {
  var repited = true
  var j = 0
  var numbers = 0
  for (var i = 0; i < 4; i++) {
    number.push(Math.round(Math.random() * (9 - 0)))
    do {
      if (number[i] == number[j] && i != j) {
        number[i] = Math.round(Math.random() * (9 - 0))
        j = 0
      } else if (j == number.length - 1) {
        repited = false
      } else { j++ }

    } while (repited)
    j = 0
    repited = true
  }
  return number
}

function arrayClient(number, res) {
  var validate=true
  if (number.length < 4 || number.length > 4) {
    validate=false
  }
  if(validate){
    for (var i = 0; i < number.length; i++) {
      if(!Number.isInteger(parseInt(number.charAt(i)))){
        validate=false
      }
    }
   if(validate) {
      var numbers = [number.charAt(0), number.charAt(1), number.charAt(2), number.charAt(3)]
      for (var i = 0; i < numbers.length; i++) {
        for (var j = 0; j < numbers.length; j++) {
          if (i != j && numbers[i] == numbers[j]) {
            validate = false
            break
          }
        }
      }
    }
  }
 
  if (validate)
    return numbers
  else
    res.send("Digite un número de cuatro digitos sin repetir.")
  return null
}

function play(numbersc,res){
  var p=0
  var f=0

  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      if(number[i]==numbersc[j]){
        if(i==j){
          f++
        }else{
          p++
        }
      }
    }
  }
  if(f==4)
  res.send("Jaiii chupapi, ganó el número desconocido era: "+number)
  else
  res.send("Tuvo "+p+" picas y "+f+" fijas")
}

app.get('/', (req, res) => {
  const numberc = req.query.c
  numbers = "" + number[0] + number[1] + number[2] + number[3]
  numbersc = arrayClient(numberc, res)
  if (numbersc != null)
    play(numbersc,res)

})
app.post('/', (req, res) => {
  const x = req.query.name;
  res.send('Hola ' + x)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

random()
