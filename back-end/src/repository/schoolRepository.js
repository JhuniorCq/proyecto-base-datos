const {open: db} = require('../db.js');

class SchoolRepository {
    
    async getSchools() {
        try {
            const sql = 'SELECT * FROM Schools';

            const result = await db(sql, [], false); //ASÍ USO AL "db", no es como en Postgre -> "pool.query"
    
            console.log(result)
            console.log(result.rows)
        
            return result.rows;
        } catch(err) {
            console.error('Error en la funcion getSchools en schoolRepository.js', err.message);
        }
    }

    async getSchool() {
        try {

        } catch(err) {
            console.error('', err.message);
        }
    }

    async enrollSchool(requestBody) {
        try {
            // MODIFICAR ESTO, ahora la Tabla Schools se ha dividido en más tablas -> Ahora hay Tabla DIRECTOR y Locations
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
            } = requestBody;
    
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
    
            return result;
        } catch(err) {
            console.error('Error en la funcion enrollSchool en schoolRepository.js', err.message);
        }
    }

    async deleteSchool() {
        try {

        } catch(err) {
            console.error('', err.message);
        }
    }

    async updateSchool() {
        try {

        } catch(err) {
            console.error('', err.message);
        }
    }

}

module.exports = {
    SchoolRepository
}
