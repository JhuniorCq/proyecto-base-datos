const {DonorCompanyService} = require('../service/donorCompanyService');
const donorCompanyService = new DonorCompanyService();

const registerDonorCompany = async (req, res) => {
    try {
        const dataDonorCompany = req.body;
        const result = await donorCompanyService.registerDonorCompany(dataDonorCompany);

        res.send(result)
    } catch(err) {
        console.error('', err.message);
        throw err;
    }
}

module.exports = {
    registerDonorCompany
}