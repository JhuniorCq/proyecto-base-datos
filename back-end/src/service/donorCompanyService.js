const axios = require('axios');
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

    async updateDonorCompanie(reqBody, id_company) {
        try {

            const {
                id_program,
                company_name,
                company_address,
                company_cellphone,
                company_email,
                donation_amount,
                donation_date
            } = reqBody;

            const datosEmpresa = {};

            //VERIFICAR QUE LOS DATOS NO SEA UNOS EXISTENTES




            // const result = await donorCompanyRepository.updateDonorCompanie(datosEmpresa, id_company);

            return result;

        } catch(err) {
            console.error('', err.message);
        }
    }

    async deleteDonorCompanie() {
        try {

        } catch(err) {
            console.error('', err.message);
        }
    }
}

module.exports = {
    DonorCompanyService
}