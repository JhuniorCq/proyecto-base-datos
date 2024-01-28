const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/routes.js')

const app = express();
app.use(morgan('dev'));

app.use(express.json()); //Esto hará que EXPRESS pueda entender los JSON que vengan del CLIENTE

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando desde http://localhost:${port}`);
});
