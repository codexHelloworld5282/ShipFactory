class CourierInterface {
    async createOrder(payload, brandCourier) {
        throw new Error("createOrder() must be implemented by subclass");
    }

    async cancelOrder(orderId, brandCourier) {
        throw new Error("cancelOrder() must be implemented by subclass");
    }
}

module.exports = CourierInterface;
