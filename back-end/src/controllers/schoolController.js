const db = require('../db.js'); //Por ahora pondremos este "db" acá, luego lo pondremos en CONTROLLERS

const getSchools = async (req, res) => {

    try {

        const sql = 'SELECT * FROM Schools';

        const result = await db(sql, [], false); //ASÍ USO AL "db", no es como en Postgre -> "pool.query"

        console.log(result)
        console.log(result.rows)
    
        // res.send('Hola mundo xD');
        res.json(result.rows);
    } catch(err) {
        console.error('Error en el archivo controller.js', err.message);
    }
}

const getSchool = async (req, res) => {
    try {

    } catch(err) {
        console.error('', err.message)
    }
}

const enrollSchool = async (req, res) => {
    try {
        const {
            modular_code, 
            name_school, 
            address, 
            district, 
            departament, 
            director_name, 
            director_lastname, 
            director_cellphone, 
            director_email
        } = req.body;

        const sql = 'INSERT INTO Schools (modular_code, name_school, address, district, departament, director_name, director_lastname, director_cellphone, director_email) VALUES (:modular_code, :name_school, :address, :district, :departament, :director_name, :director_lastname, :director_cellphone, :director_email)'; //Para ORACLE se usa ":", para POSTGRE era "$"

        const binds = {
            modular_code,
            name_school,
            address,
            district,
            departament,
            director_name,
            director_lastname,
            director_cellphone,
            director_email
        };

        const result = await db(sql, binds, true);

        console.log(result);

        res.json(result)

    } catch(err) {
        console.error('Error en enrollSchool en schoolController', err.message);
    }
}

const deleteSchool = async (req, res) => {
    try {

    } catch(err) {
        console.error('', err.message);
    }
}

const updateSchool = async (req, res) => {
    try {

    } catch(err) {
        console.error('', err.message);
    }
}

module.exports = {
    getSchools,
    getSchool,
    enrollSchool,
    deleteSchool,
    updateSchool
}