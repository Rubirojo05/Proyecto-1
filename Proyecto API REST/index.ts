const express = require("express")

const app = express()
const port = 1900

app.get('/', (req, res) => {
    res.send('Hola Mundo!')
})

app.listen(port, () => {
    console.log(`Escuchando en puerto ${port}`)
})