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

const getDonation = async (req, res) => {
    try {
        const {id_company, id_program} = req.params;
        const result = await donorCompanyService.getDonation(id_company, id_program);

        res.json(result);
    } catch(err) {
        console.error('', err.message);
    }
}

const updateDonorCompanie = async (req, res) => {
    try {
        const {id_company, id_program} = req.params;
        
        const result = await donorCompanyService.updateDonorCompanie(req.body, id_company, id_program);

        res.send(result);

    } catch(err) {
        console.error('', err.message);
    }
}

const deleteDonorCompanie = async (req, res) => {
    try {

    } catch(err) {
        console.error('', err.message);
    }
}

module.exports = {
    registerDonorCompany,
    getDonorCompanies,
    getDonorCompanie,
    updateDonorCompanie,
    deleteDonorCompanie,
    getDonation
}