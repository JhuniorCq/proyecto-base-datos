const {open: db} = require('../db.js');
const oracledb = require('oracledb');

class ResourceRepository {
    async getResources(id_program) {
        try {
            const sql = `
                SELECT resource_name, resource_description, resource_quantity, id_program 
                FROM Resources WHERE id_program = :id_program
            `;

            const binds = {
                id_program
            };
            const result = await db(sql, binds, false);
            // console.log(result.rows);

            return result.rows;
        } catch(err) {
            console.error('', err.message);
        }
    }
}

module.exports = {
    ResourceRepository
}