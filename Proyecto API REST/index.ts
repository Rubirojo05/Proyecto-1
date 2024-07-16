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
    const ip = req.query.ip;
    if (!ip) {
        console.log('IP no proporcionada en la solicitud');
        return res.status(400).send('IP no proporcionada');
    }

    console.log(`IP recibida: ${ip}`);

    try {
        const response = await axios.get(`https://api.ipapi.is/?q=${ip}`);
        const data = response.data;

        const IpInfo = `
            IP: ${data.ip}\n
            COMPAÑÍA: ${data.company.name}\n
            NETWORK: ${data.company.network}\n
            RUTA: ${data.asn.route}\n
            DESCRIPCIÓN: ${data.asn.descr}\n
            PAÍS: ${data.asn.country}\n
            ORGANIZACIÓN: ${data.asn.org}\n
            DOMINIO: ${data.asn.domain}\n
            LOCALIZACIÓN: ${data.location.city}\n
            ZONA HORARIA: ${data.location.timezone}\n
            HORA ACTUAL: ${data.location.local_time} `;

        res.json(IpInfo);
    } catch (error) {
        console.error('Error al obtener la información de IP', error);
        res.status(500).send('Error al obtener la información de IP');
    }

});


app.listen(port, () => {
    console.log(`Escuchando en puerto ${port}`)
})

