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
            const {
                modular_code, name_school,
                director_name, director_lastname, director_cellphone, director_email,
                dni, student_name , student_lastname, birth_date, gender, 
                address,
                district_name,
                province_name,
                department_name
            } = requestBody;

            // INSERTANDO DATOS PARA LA TABLA Directors
            const sqlInsertDirector = 'INSERT INTO Directors (director_name, director_lastname, director_cellphone, director_email) VALUES (:director_name, :director_lastname, :director_cellphone, :director_email) RETURNING id_director INTO :id_director';
            
            const bindsDirector = {
                director_name,
                director_lastname,
                director_cellphone,
                director_email,
                id_director: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
            };

            const resultDirector = await db(sqlInsertDirector, bindsDirector, true);
            const id_director = resultDirector.outBinds.id_director[0];
            
            // INSERTANDO DATOS PARA LA TABLA Departments

            // INSERTANDO DATOS PARA LA TABLA Provinces
            
            //INSERTANDO DATOS PARA LA TABLA Districts

            // INSERTANDO DATOS PARA LA TABLA 
            // INSERTANDO DATOS PARA LA TABLA Locations
            const sqlInsertLocation = 'INSERT INTO Locations';

            // INSERTANDO DATOS PARA LA TABLA Schools, pero antes de eso debe INSERTAR DATOS en Directors y Locations
            const sqlInsertSchool = 'INSERT INTO Schools (modular_code, name_school, id_director, id_location) VALUES (:modular_code, :name_school, :id_director, :id_location)'; //Para ORACLE se usa ":", para POSTGRE era "$"
    
            const bindsSchool = {
                modular_code,
                name_school,
                id_director,
                id_location
            };
    
            const resultSchool = await db(sqlInsertSchool, bindsSchool, true);
    
            return resultSchool;
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
