const axios = require("axios");
const CourierInterface = require("../../service/interface");
const BlueExService = require("./order.service");

class BlueExCourier extends CourierInterface {
    async createOrder(payload, courierDetails) {
        console.log("BlueEx create order start");
        return await BlueExService.createConsignment(payload, courierDetails);
    }

    async cancelOrder(payload, bookingDetails, courierDetails) {
        console.log("BlueEx cancel order start");
        return await BlueExService.cancelConsignment(payload, bookingDetails, courierDetails);
    }
}

module.exports = BlueExCourier;
