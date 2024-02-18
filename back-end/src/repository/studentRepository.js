const {open: db} = require('../db.js');
const oracledb = require('oracledb');//Se usa cuando hago un INSERT

class StudentRepository {
    async getStudents(modular_code) {
        try {
            const sql = 'SELECT * FROM Students WHERE modular_code = :modular_code';
            const binds = {
                modular_code
            };
            const result = await db(sql, binds, false);
            console.log(result.rows);

            return result.rows;
        } catch(err) {
            console.error('', err.message);
        }
    }
}

module.exports = {
    StudentRepository
}