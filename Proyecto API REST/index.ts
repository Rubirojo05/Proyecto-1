const express = require("express")

const app = express()
const port = 1900
const minimo = 100
const maximo = 200
let cuenta = 0

function randomEntre(min:number, max:number){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

app.get('/', (req, res) => {
    res.send('Hola Mundo!')
})

app.get('/cuenta', (req, res) => {
    cuenta = cuenta + 1
    res.send(cuenta.toString())
})

app.get('/random', (req, res) => {
    const random = randomEntre(minimo, maximo)
    res.send(random.toString())
})

app.listen(port, () => {
    console.log(`Escuchando en puerto ${port}`)
})

