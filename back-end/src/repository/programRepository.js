const {open: db} = require('../db.js');
const oracledb = require('oracledb');

class ProgramRepository {
    async assignProgram(dataProgram) {
        try {
            const {
                modular_code,
                program_name,
                program_description,
                objective,
                budget,
                start_date,
                end_date,
                array_recursos
            } = dataProgram;

            // INSERTANDO DATOS EN LA TABLA Programs -> Pero antes nos debemos asegurar que como mínimo haya 1 recurso
            const sqlInsertProgram = 'INSERT INTO Programs (program_name, program_description, objective, budget, start_date, end_date, modular_code) VALUES (:program_name, :program_description, :objective, :budget, :start_date, :end_date, :modular_code) RETURNING id_program INTO :id_program';

            const bindsProgram = {
                program_name,
                program_description,
                objective,
                budget,
                start_date,
                end_date,
                modular_code,
                id_program: {type: oracledb.NUMBER, dir: oracledb.BIND_OUT}
            }

            const resultProgram = await db(sqlInsertProgram, bindsProgram, true);
            const id_program = resultProgram.outBinds.id_program[0];
            
            // INSERTANDO DATOS EN LA TABLA Resources
            console.log(array_recursos.length, 'Esta es la cantidad de recursos', array_recursos[0])

            for(const recurso of array_recursos) {
                const resource_name = recurso['nombre-recurso'];
                const resource_description = recurso['descripcion-recurso'];
                const resource_quantity = recurso['cantidad-recurso'];

                const sqlInsertResource = 'INSERT INTO Resources (resource_name, resource_description, resource_quantity, id_program) VALUES (:resource_name, :resource_description, :resource_quantity, :id_program)';

                const bindsResource = {
                    resource_name,
                    resource_description,
                    resource_quantity,
                    id_program
                }

                const resultResource = await db(sqlInsertResource, bindsResource, true);
            }

            return 'El programa ha sido registrado.';
        } catch(err) {
            console.error('Error en assignProgram en programRepository.js', err.message);
            throw err;
        }
    }

    async getPrograms() {
        try {
            const sql = `SELECT * FROM Programs ORDER BY programs.id_program ASC`;

            const result = await db(sql, [], false);
            console.log('Resultado en repository', result.rows);

            return result.rows;
        } catch(err) {
            console.error('Error en assignProgram en programRepository.js', err.message);
            throw err;
        }
    }

    async getProgram(id_program) {
        try {
            const sql = 'SELECT * FROM Programs WHERE id_program = :id_program';

            const binds = {
                id_program
            };

            const result = await db(sql, binds, false);
            console.log(result.rows);

            return result.rows;
        } catch(err) {
            console.error('', err.message);
            throw err;
        }
    }

    async updateProgram(dataProgram, id_program) {
        try {
            const {
                modular_code,
                program_name,
                program_description,
                objective,
                budget,
                start_date,
                end_date
            } = dataProgram;

            const sql = `
                UPDATE Programs
                SET modular_code = :modular_code,
                    program_name = :program_name,
                    program_description = :program_description,
                    objective = :objective,
                    budget = :budget,
                    start_date = :start_date,
                    end_date = :end_date
                WHERE id_program = :id_program
            `;

            const binds = {
                modular_code,
                program_name,
                program_description,
                objective,
                budget,
                start_date,
                end_date,
                id_program
            };

            const result = await db(sql, binds, true);

            return 'Los datos han sido modificados.';

        } catch(err) {
            console.error('', err.message);
        }
    }

    async deleteProgram(id_program) {
        try {
            const sqlDeleteResource = `
                DELETE FROM Resources
                WHERE id_program = :id_program
            `;

            const binds = {
                id_program
            };

            await db(sqlDeleteResource, binds, true);

            const sqlDeleteDonation = `
                DELETE FROM Donations
                WHERE id_program = :id_program
            `;

            await db(sqlDeleteDonation, binds, true);

            const sqlDeleteProgram = `
                DELETE FROM Programs
                WHERE id_program = :id_program
            `;
            await db(sqlDeleteProgram, binds, true);

            return 'El programa ha sido eliminado';
        } catch(err) {
            console.error('', err.message);
        }
    }
}

module.exports = {
    ProgramRepository
}