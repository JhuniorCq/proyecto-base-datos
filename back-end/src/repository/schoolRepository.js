// const { id_program } = require('../../../front-end/js/viewPrograms.js');
const {open: db} = require('../db.js');
const oracledb = require('oracledb');
const axios = require('axios');

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
                    departments.department_name,
                    directors.id_director,
                    locations.id_location,
                    districts.id_district,
                    provinces.id_province,
                    departments.id_department
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
                address,
                district_name,
                province_name,
                department_name
            } = requestBody;         

            console.log(modular_code);

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

    async updateSchool(dataSchool, current_modular_code) {
        try {
            const {
                /*modular_code,*/ name_school,
                director_name, director_lastname, director_cellphone, director_email,
                address,
                district_name,
                province_name,
                department_name,
                excelStudents,
                id_director, id_location, id_district, id_province, id_department
            } = dataSchool;  

            //MODIFICANDO EN LA TABLA Directors
            const sqlDirector = `
                UPDATE Directors
                SET director_name = :director_name,
                    director_lastname = :director_lastname,
                    director_cellphone = :director_cellphone,
                    director_email = :director_email
                WHERE id_director = :id_director
            `;

            const bindsDirector = {
                director_name,
                director_lastname,
                director_cellphone,
                director_email,
                id_director
            };

            const resultDirector = await db(sqlDirector, bindsDirector, true);

            //MODIFICANDO EN LA TABLA Departments
            const sqlDepartment = `
                UPDATE Departments
                SET department_name = :department_name
                WHERE id_department = :id_department
            `;

            const bindsDepartment = {
                department_name,
                id_department
            };

            const resultDepartment = await db(sqlDepartment, bindsDepartment, true);
            
            //MODIFICANDO EN LA TABLA Provinces
            const sqlProvince = `
                UPDATE Provinces
                SET province_name = :province_name
                WHERE id_province = :id_province
            `;

            const bindsProvince = {
                province_name,
                id_province
            };

            const resultProvince = await db(sqlProvince, bindsProvince, true);

            //MODIFICANDO EN LA TABLA Districts
            const sqlDistrict = `
                UPDATE Districts
                SET district_name = :district_name
                WHERE id_district = :id_district
            `;

            const bindsDistrict = {
                district_name,
                id_district
            };

            const resultDistrict = await db(sqlDistrict, bindsDistrict, true);

            //MODIFICANDO EN LA TABLA Locations
            const sqlLocation = `
                UPDATE Locations
                SET address = :address
                WHERE id_location = :id_location
            `;

            const bindsLocation = {
                address,
                id_location
            };

            const resultLocation = await db(sqlLocation, bindsLocation, true);

            //MODIFICANDO EN LA TABLA Schools
            const sqlSchool = `
                UPDATE Schools
                SET name_school = :name_school
                WHERE modular_code = :modular_code
            `;

            const bindsSchool = {
                name_school,
                modular_code: current_modular_code
            };

            const resultSchool = await db(sqlSchool, bindsSchool, true);

            //MODIFICANDO EN LA TABLA Students -> Primer Elimino y luego modifico

            if(excelStudents !== undefined) {
                const sqlStudents = `
                    DELETE FROM Students
                    WHERE modular_code = :modular_code
                `;

                const bindsStudents = {
                    modular_code: current_modular_code
                };

                await db(sqlStudents, bindsStudents, true);

                for(const student of excelStudents) {
                    const sqlInsertStudent = 'INSERT INTO Students (dni, student_name, student_lastname, birth_date, gender, modular_code) VALUES (:dni, :student_name, :student_lastname, :birth_date, :gender, :modular_code)';

                    const bindsStudent = {
                        dni: student["dni"],
                        student_name: student["student_name"],
                        student_lastname: student["student_lastname"],
                        birth_date: student["birth_date"],
                        gender: student["gender"],
                        modular_code: current_modular_code
                    }
                    const resultStudent = await db(sqlInsertStudent, bindsStudent, true);
                    
                    console.log('Estudiante almacenando correctamente');
                }
            }
            

            return 'Los datos han sido modificados.';

        } catch(err) {
            console.error('', err.message);
            throw err; // Propagar el error para que sea manejado por el controlador que llame a esta función
        }
    }

    async deleteSchool(modular_code, ids) {
        try {

            const {
                id_director,
                id_location,
                id_district,
                id_province,
                id_department
            } = ids;

            const sqlDeleteStudents = `
                DELETE FROM Students
                WHERE modular_code = :modular_code
            `;

            const binds = {
                modular_code
            };

            await db(sqlDeleteStudents, binds, true);


            const sqlSelectProgram = `SELECT id_program FROM Programs WHERE modular_code = :modular_code`;
            const result = await db(sqlSelectProgram, binds, false);

            if(result.rows.length > 0) {
                const id_program = result.rows[0][0];
    
                //Eliminando programas asociados a la escuela
                await axios.delete(`http://localhost:3000/deleteProgram/${id_program}`);
            }
            // const sqlDeleteProgram = `
            //     DELETE FROM Programs
            //     WHERE modular_code = :modular_code
            // `;

            // await db(sqlDeleteProgram, binds, true);

            const sqlDeleteSchool = `
                DELETE FROM Schools
                WHERE modular_code = :modular_code
            `;

            await db(sqlDeleteSchool, binds, true);

            const sqlDeleteDirector = `
                DELETE FROM Directors
                WHERE id_director = :id_director
            `;

            const bindsDirector = {
                id_director
            };

            await db(sqlDeleteDirector, bindsDirector, true);

            const sqlDeleteLocation = `
                DELETE FROM Locations
                WHERE id_location = :id_location
            `;

            const bindsLocation = {
                id_location
            };

            await db(sqlDeleteLocation, bindsLocation, true);

            const sqlDeleteDistrict = `
                DELETE FROM Districts
                WHERE id_district = :id_district
            `;

            const bindsDistrict = {
                id_district
            };

            await db(sqlDeleteDistrict, bindsDistrict, true);

            const sqlDeleteProvince = `
                DELETE FROM Provinces
                WHERE id_province = :id_province
            `;

            const bindsProvince = {
                id_province
            };

            await db(sqlDeleteProvince, bindsProvince, true);

            const sqlDeleteDepartment = `
                DELETE FROM Departments
                WHERE id_department = :id_department
            `;

            const bindsDepartment = {
                id_department
            };

            await db(sqlDeleteDepartment, bindsDepartment, true);

            

            return 'La Escuela ha sido eliminada';
        } catch(err) {
            console.error('', err.message);
        }
    }
}

module.exports = {
    SchoolRepository
}
