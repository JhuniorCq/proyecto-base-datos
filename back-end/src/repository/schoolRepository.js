const {open: db} = require('../db.js');
const oracledb = require('oracledb');

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

    // const birthDate = new Date(requestBody.birth_date); // Convertir la cadena de fecha en un objeto Date

    // // Formatear la fecha en el formato requerido por Oracle (por ejemplo, 'DD-MM-YYYY')
    // const formattedBirthDate = birthDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').reverse().join('-');

    // // Luego puedes usar formattedBirthDate en tu inserción SQL


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

            console.log(modular_code)
            console.log(dni)
            // Verificar si el modular_code ya existe en la base de datos
            const sqlCheckModularCode = 'SELECT COUNT(*) FROM Schools WHERE modular_code = :modular_code';
            const bindsCheckModularCode = {modular_code};
            const resultCheckModularCode = await db(sqlCheckModularCode, bindsCheckModularCode, false);
            const modularCodeCount = resultCheckModularCode.rows[0][0];

            //Verificar si el dni ya existe en la base de datos
            const sqlCheckDdni = 'SELECT COUNT(*) FROM Students WHERE dni = :dni';
            const bindsCheckDni = {dni};
            const resultCheckDni = await db(sqlCheckDdni, bindsCheckDni, false);
            const dniCount = resultCheckDni.rows[0][0];

            console.log(`Cantidad de existencia de ${dni}: ${dniCount}`);

            // Si el modular_code ya existe, lanzar un error
            if (modularCodeCount > 0 || dniCount > 0) {
                throw new Error('El código modular o el dni ya existe en la base de datos.');
            }

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
                student_lastname,
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
