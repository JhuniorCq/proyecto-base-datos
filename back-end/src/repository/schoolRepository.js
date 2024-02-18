const {open: db} = require('../db.js');
const oracledb = require('oracledb');

class SchoolRepository {
    
    async getSchools() {
        try {
            const sql = `
                SELECT 
                    schools.modular_code, 
                    schools.name_school, 
                    directors.director_name, 
                    directors.director_lastname, 
                    directors.director_cellphone, 
                    directors.director_email, 
                    locations.address, 
                    districts.district_name, 
                    provinces.province_name, 
                    departments.department_name 
                FROM Schools 
                INNER JOIN Directors ON schools.id_director = directors.id_director
                INNER JOIN Locations ON schools.id_location = locations.id_location
                INNER JOIN Districts ON locations.id_district = districts.id_district
                INNER JOIN Provinces ON districts.id_province = provinces.id_province
                INNER JOIN Departments ON provinces.id_department = departments.id_department
                ORDER BY modular_code ASC
            `;

            const result = await db(sql, [], false); //ASÍ USO AL "db", no es como en Postgre -> "pool.query"
            console.log(result.rows)
        
            return result.rows;
        } catch(err) {
            console.error('Error en la funcion getSchools en schoolRepository.js', err.message);
        }
    }

    async getSchool(modular_code) {
        try {
            const sql = `
                SELECT 
                    schools.modular_code, 
                    schools.name_school, 
                    directors.director_name, 
                    directors.director_lastname, 
                    directors.director_cellphone, 
                    directors.director_email, 
                    locations.address, 
                    districts.district_name, 
                    provinces.province_name, 
                    departments.department_name 
                FROM Schools 
                INNER JOIN Directors ON schools.id_director = directors.id_director
                INNER JOIN Locations ON schools.id_location = locations.id_location
                INNER JOIN Districts ON locations.id_district = districts.id_district
                INNER JOIN Provinces ON districts.id_province = provinces.id_province
                INNER JOIN Departments ON provinces.id_department = departments.id_department
                WHERE modular_code = :modular_code
            `;
            const binds = {
                modular_code
            };
            const result = await db(sql, binds, false);
            
            console.log(result.rows);

            return result.rows;

        } catch(err) {
            console.error('Error en getSchool en schoolRepository.js', err.message);
        }
    }

    //SI USO EL BODY DEL THUNDERCLIENT MEBOTARÁ ERROR PORQUE EL dataSheet estará VACÍO
    async enrollSchool(requestBody, dataSheet) {
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

            //Verificar si los dni ya existen en la base de datos

            for(const student of dataSheet) {
                const sqlCheckDni = 'SELECT COUNT(*) FROM Students WHERE dni = :dni';
                const bindsCheckDni = {dni: student["dni"]};
                const resultCheckDni = await db(sqlCheckDni, bindsCheckDni, false);
                const dniCount = resultCheckDni.rows[0][0];
                console.log(`Cantidad de existencia de dni ${student["dni"]}: ${dniCount}`);
                // Si el dni ya existe, lanzar un error
                if(dniCount > 0) {
                    throw new Error('El dni ya existe en la base de datos.');
                }
            }

            console.log(`Cantidad de existencia de modular_code ${modular_code}: ${modularCodeCount}`);

            // Si el modular_code ya existe, lanzar un error
            if (modularCodeCount) {
                throw new Error('El código modular ya existe en la base de datos.');
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
    
            // INSERTANDO DATOS PARA LA TABLA Students -> Haremos un Bucle ya que son varios estudiantes
            for(const student of dataSheet) {
                const sqlInsertStudent = 'INSERT INTO Students (dni, student_name, student_lastname, birth_date, gender, modular_code) VALUES (:dni, :student_name, :student_lastname, :birth_date, :gender, :modular_code)';

                const bindsStudent = {
                    dni: student["dni"],
                    student_name: student["student_name"],
                    student_lastname: student["student_lastname"],
                    birth_date: student["birth_date"],
                    gender: student["gender"],
                    modular_code: modular_code
                }
                const resultStudent = await db(sqlInsertStudent, bindsStudent, true);
                
                console.log('Estudiante almacenando correctamente');
            }


            return resultSchool;
        } catch(err) {
            console.error('Error en la funcion enrollSchool en schoolRepository.js', err.message);
            throw err; // El throw err -> Hace que el Error se propague, porque no lo estoy maejando
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
