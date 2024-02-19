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

    async getDonorCompanies() {
        try {
            const sql = `
                SELECT 
                    companies.id_company,
                    companies.company_name,
                    companies.company_address,
                    companies.company_cellphone,
                    companies.company_email,
                    donations.donation_amount,
                    donations.donation_date,
                    donations.id_program,
                    programs.program_name
                FROM Companies 
                INNER JOIN Donations 
                ON companies.id_company = donations.id_company 
                INNER JOIN Programs
                ON donations.id_program = programs.id_program
                ORDER BY companies.id_company
            `;

            const result = await db(sql, [], false);
            console.log(result.rows);

            return result.rows;
        } catch(err) {
            console.error('Error en getDonorCompanies en donorCompanyRepository.js', err.message);
            throw err;
        }
    }

    async getDonorCompanie(id_company) {
        try {
            const sql = `
                SELECT 
                    companies.id_company,
                    companies.company_name,
                    companies.company_address,
                    companies.company_cellphone,
                    companies.company_email,
                    donations.donation_amount,
                    donations.donation_date,
                    donations.id_program,
                    programs.program_name
                FROM Companies 
                INNER JOIN Donations 
                ON companies.id_company = donations.id_company 
                INNER JOIN Programs
                ON donations.id_program = programs.id_program
                WHERE companies.id_company = :id_company
                ORDER BY companies.id_company
            `;

            const binds = {
                id_company
            };

            const result = await db(sql, binds, false);
            console.log(result.rows)

            return result.rows;
        } catch(err) {
            console.error('', err.message);
            throw err;
        }
    }
}

module.exports = {
    DonorCompanyRepository
}