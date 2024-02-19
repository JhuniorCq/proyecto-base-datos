const {DonorCompanyRepository} = require('../repository/donorCompanyRepository');
const donorCompanyRepository = new DonorCompanyRepository();

class DonorCompanyService {
    async registerDonorCompany(dataDonorCompany) {
        try {
            const result = await donorCompanyRepository.registerDonorCompany(dataDonorCompany);

            return result;
        } catch(err) {
            console.error('', err.message);
        }
    }

    async getDonorCompanies() {
        try {
            const result = await donorCompanyRepository.getDonorCompanies();

            return result;
        } catch(err) {
            console.error('', err.message);
            throw err;
        }
    }

    async getDonorCompanie(id_company) {
        try {
            const result = await donorCompanyRepository.getDonorCompanie(id_company);

            return result;
        } catch(err) {
            console.error('Error en getDonorCompanie en donorCompanyService.js', err.message);
            throw err;
        }
    }
}

module.exports = {
    DonorCompanyService
}