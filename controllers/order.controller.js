// order.controller.js
const CourierService = require("../service/CourierService");

class OrderController {
    static async create(req, res) {
        try {
            const brandCourierId = Number(req.query.brandCourierId);
            const response = await CourierService.createOrder(req.body, brandCourierId);
            res.json(response);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async cancel(req, res) {
        try {
            const { orderId } = req.body;
            const brandCourierId = Number(req.query.brandCourierId);
            const response = await CourierService.cancelOrder(orderId, brandCourierId);
            res.json(response);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = OrderController;
