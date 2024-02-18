const {DonorCompanyRepository} = require('../repository/donorCompanyRepository');
const donarCompanyRepository = new DonorCompanyRepository();

class DonorCompanyService {
    async registerDonorCompany(dataDonorCompany) {
        try {
            const result = await donarCompanyRepository.registerDonorCompany(dataDonorCompany);

            return result;
        } catch(err) {
            console.error('', err.message);
        }
    }
}

module.exports = {
    DonorCompanyService
}