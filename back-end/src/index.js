const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const {router} = require('./routes/routes.js')

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));
app.use(morgan('dev'));
app.use(express.json()); //Esto hará que EXPRESS pueda entender los JSON que vengan del CLIENTE, y los convierta a un OBJETO

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando desde http://localhost:${port}`);
});
