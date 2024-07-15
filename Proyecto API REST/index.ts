const express = require("express")
const cors = require("cors")
const axios = require("axios");

const app = express()
const port = 1900
const minimo = 100
const maximo = 200
let cuenta = 0

function randomEntre(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const opcionesCors = {
    origin: 'http://localhost:4321',
}

app.use(cors(opcionesCors));

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

app.get('/ip', async (req, res) => {
    try {
        const response = await axios.get('https://ifconfig.me/');
        res.send(response.data);
    } catch (error) {
        console.error('Error al obtener la IP', error)
        res.status(500).send('Error al obtener la IP');
    }
});

app.get('/ipinfo', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const respuesta = await axios.get(`https://api.ipapi.is/${ip}`);
        res.send(respuesta.data);
    } catch (error) {
        console.error('Error al obtener la IP', error)
        res.status(500).send('Error al obtener la IP');
    }
});

app.listen(port, () => {
    console.log(`Escuchando en puerto ${port}`)
})

