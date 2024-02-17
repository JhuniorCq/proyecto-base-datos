const {StudentService} = require('../service/studentService');
const studentService = new StudentService();

const getStudents = async (req, res) => {
    try {
        const {modular_code} = req.params;
        const result = await studentService.getStudents(modular_code);

        res.json(result);
    } catch(err) {
        console.error('', err.message);
    }
}

module.exports = {
    getStudents
}