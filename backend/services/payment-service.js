const BaseService = require("./base-service");
const Payment = require("../models/payment");

class PaymentService extends BaseService {
    // Ödeme işlemi sırasında konum bilgisini kullanarak bir işlem yapılacaksa
    // Bu işlemi buraya ekleyebilirsiniz.
}

module.exports = new PaymentService(Payment);
