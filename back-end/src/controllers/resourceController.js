const {ResourceService} = require('../service/resourceService.js')
const resourceService = new ResourceService();

const getResources = async (req, res) => {
    try {
        const {id_program} = req.params;
        const result = await resourceService.getResources(id_program);
        console.log(result)
        res.json(result);
    } catch(err) {
        console.error('', err.message);
    }
}

module.exports = {
    getResources
}