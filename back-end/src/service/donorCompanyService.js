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

    async getDonation(id_company, id_program) {
        try {
            const result = await donorCompanyRepository.getDonation(id_company, id_program);

            return result;
        } catch(err) {
            console.error('', err.message);
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
            

            //VERIFICAR QUE LOS DATOS NO SEAN UNOS EXISTENTES
            const response = await axios.get(`http://localhost/getDonorCompanie/${id_company}`);
            const dataEmpresa = response.data[0];

            company_name === ''? datosEmpresa['company_name'] = dataEmpresa[1]: datosEmpresa['company_name'] = company_name;
            company_address === ''? datosEmpresa['company_address'] = dataEmpresa[2]: datosEmpresa['company_address'] = company_address;
            company_cellphone === ''? datosEmpresa['company_cellphone'] = dataEmpresa[3]: datosEmpresa['company_cellphone'] = company_cellphone;
            company_email === ''? datosEmpresa['company_email'] = dataEmpresa[4]: datosEmpresa['company_email'] = company_email;

            //VERIFICAR QUE LOS DATOS NO SEAN UNOS EXISTENTES
            const responseDonation = await axios.get(`http://localhost:3000/getDonation/${id_company}/${id_program}`);
            const datosDonacion = responseDonation.data[0];

            donation_amount === ''? dataEmpresa['donation_amount'] = datosDonacion[0]: dataEmpresa['donation_amount'] = donation_amount;
            donation_date === ''? dataEmpresa['donation_date'] = datosDonacion[1]: dataEmpresa['donation_date'] = donation_date;
            id_program === ''? dataEmpresa['id_program'] = datosDonacion[3]: dataEmpresa['id_program'] = id_program;

            const result = await donorCompanyRepository.updateDonorCompanie(datosEmpresa, id_company);

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