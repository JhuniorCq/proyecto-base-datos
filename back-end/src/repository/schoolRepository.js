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
            const sqlInsertDepartment = 'INSERT INTO Departments (department_name) VALUES (:department_name) RETURNING id_department INTO :id_department';

            const bindsDepartment = {
                department_name,
                id_department: {type: oracledb.NUMBER, dir: oracledb.BIND_OUT}
            }

            const resultDepartment = await db(sqlInsertDepartment, bindsDepartment, true);
            const id_department = resultDepartment.outBinds.id_department[0];

            // INSERTANDO DATOS PARA LA TABLA Provinces
            const sqlInsertProvince = 'INSERT INTO Provinces (province_name, id_department) VALUES (:province_name, :id_department) RETURNING id_province INTO :id_province';

            const bindsProvince = {
                province_name,
                id_department,
                id_province: {type: oracledb.NUMBER, dir: oracledb.BIND_OUT}
            }

            const resultProvince = await db(sqlInsertProvince, bindsProvince, true);
            const id_province = resultProvince.outBinds.id_province[0];

            //INSERTANDO DATOS PARA LA TABLA Districts
            const sqlInsertDistrict = 'INSERT INTO Districts (district_name, id_province) VALUES (:district_name, :id_province) RETURNING id_district INTO :id_district';

            const bindsDistrict = {
                district_name,
                id_province,
                id_district: {type: oracledb.NUMBER, dir: oracledb.BIND_OUT}
            }

            const resultDistrict = await db(sqlInsertDistrict, bindsDistrict, true);
            const id_district = resultDistrict.outBinds.id_district[0];

            // INSERTANDO DATOS PARA LA TABLA Locations
            const sqlInsertLocation = 'INSERT INTO Locations (address, id_district) VALUES (:address, :id_district) RETURNING id_location INTO :id_location';

            const bindsLocation = {
                address,
                id_district,
                id_location: {type: oracledb.NUMBER, dir: oracledb.BIND_OUT}
            }

            const resultLocation = await db(sqlInsertLocation, bindsLocation, true);
            const id_location = resultLocation.outBinds.id_location[0];
            
            // INSERTANDO DATOS PARA LA TABLA Schools, pero antes de eso debe INSERTAR DATOS en Directors y Locations
            const sqlInsertSchool = 'INSERT INTO Schools (modular_code, name_school, id_director, id_location) VALUES (:modular_code, :name_school, :id_director, :id_location)'; //Para ORACLE se usa ":", para POSTGRE era "$"
    
            const bindsSchool = {
                modular_code,
                name_school,
                id_director,
                id_location
            };
    
            const resultSchool = await db(sqlInsertSchool, bindsSchool, true);
    
            // INSERTANDO DATOS PARA LA TABLA Students
            const sqlInsertStudent = 'INSERT INTO Students (dni, student_name, student_lastname, birth_date, gender, modular_code) VALUES (:dni, :student_name, :student_lastname, :birth_date, :gender, :modular_code)';

            const bindsStudent = {
                dni,
                student_name,
                birth_date,
                gender,
                modular_code
            }

            const resultStudent = await db(sqlInsertStudent, bindsStudent, true);

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
