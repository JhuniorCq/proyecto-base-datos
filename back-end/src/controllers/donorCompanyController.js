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

const getDonorCompanies = async (req,res) => {
    try {
        const result = await donorCompanyService.getDonorCompanies();

        res.json(result);
    } catch(err) {
        console.error('', err.message);
        throw err;
    }
}

const getDonorCompanie = async (req, res) => {
    try {
        const {id_company} = req.params;
        const result = await donorCompanyService.getDonorCompanie(id_company);

        res.json(result);
    } catch(err) {
        console.error('Error en getDonorCompanie en donorCompanyController.js', err.message);
        throw err;
    }
}

module.exports = {
    registerDonorCompany,
    getDonorCompanies,
    getDonorCompanie
}