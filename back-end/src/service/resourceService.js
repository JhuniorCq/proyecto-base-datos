const {ResourceRepository} = require('../repository/resourceRepository.js');
const resourceRepository = new ResourceRepository();

class ResourceService {
    async getResources(id_program) {
        try {
            const result = await resourceRepository.getResources(id_program);

            return result;
        } catch(err) {
            console.error('', err.message);
        }
    }
}

module.exports = {
    ResourceService
}