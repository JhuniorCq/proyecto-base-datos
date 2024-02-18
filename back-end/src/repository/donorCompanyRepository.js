const {open: db} = require('../db.js');
const oracledb = require('oracledb');//Se usa cuando hago un INSERT

class DonorCompanyRepository {
    async registerDonorCompany(dataDonorCompany) {
        try {
            const {
                company_name,
                company_address,
                company_cellphone,
                company_email,
                id_program,
                donation_amount,
                donation_date
            } = dataDonorCompany;

            //INSERTANDO DATOS EN LA TABLA Companies
            const sqlInsertCompany = 'INSERT INTO Companies (company_name, company_address, company_cellphone, company_email) VALUES (:company_name, :company_address, :company_cellphone, :company_email) RETURNING id_company INTO :id_company';

            const bindsDonorCompany = {
                company_name,
                company_address,
                company_cellphone,
                company_email,
                id_company: {type: oracledb.NUMBER, dir: oracledb.BIND_OUT}
            }

            const resultDonorCompany = await db(sqlInsertCompany, bindsDonorCompany, true);

            const id_company = resultDonorCompany.outBinds.id_company[0];

            // INSERTANDO DATOS EN LA TABLA Donations
            const sqlInsertDonation = 'INSERT INTO Donations (donation_amount, donation_date, id_company, id_program) VALUES (:donation_amount, :donation_date, :id_company, :id_program)';

            const bindsDonation = {
                donation_amount,
                donation_date,
                id_company,
                id_program
            }

            const resultDonation = await db(sqlInsertDonation, bindsDonation, true);

            return 'La empresa donante ha sido registrada.'
        } catch(err) {
            console.error('', err.message);
        }
    }
}

module.exports = {
    DonorCompanyRepository
}