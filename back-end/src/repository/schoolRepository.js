const {open: db} = require('../db.js');

class SchoolRepository {
    
    async getSchools() {
        try {
            const sql = 'SELECT * FROM Schools';

            const result = await db(sql, [], false); //ASÍ USO AL "db", no es como en Postgre -> "pool.query"
    
            // console.log(result)
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
            // INSERTANDO DATOS PARA LA TABLA Schools, pero antes de eso debe INSERTAR DATOS en Directos y Locations
            const {
                modular_code, 
                name_school, 
                id_director,
                id_location
            } = requestBody;
    
            const sql = 'INSERT INTO Schools (modular_code, name_school, id_director, id_location) VALUES (:modular_code, :name_school, :id_director, :id_location)'; //Para ORACLE se usa ":", para POSTGRE era "$"
    
            const binds = {
                modular_code,
                name_school,
                id_director,
                id_location
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
