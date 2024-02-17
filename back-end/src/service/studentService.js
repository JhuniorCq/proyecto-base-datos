const {StudentRepository} = require('../repository/studentRepository.js');
const studentRepository = new StudentRepository();

class StudentService {

    async getStudents(modular_code) {
        try {
            const result = studentRepository.getStudents(modular_code);

            return result;
        } catch(err) {
            console.error('', err.message);
        }
    }
}

module.exports = {
    StudentService
}