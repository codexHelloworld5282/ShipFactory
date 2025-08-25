const CourierInterface = require("../../service/interface");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // for auto CN

// Dummy booked order schema
const bookedOrderSchema = new mongoose.Schema({
    cn: String,
    orderId: String,
    courier: String,
    brand: String,
    payload: Object,
    status: { type: String, default: "BOOKED" },
    createdAt: { type: Date, default: Date.now },
});
const BookedOrder = mongoose.model("DummyBookedOrder", bookedOrderSchema);

class DummyCourier extends CourierInterface {
    constructor(name) {
        super();
        this.name = name;
    }

    async createOrder(payload, brandCourier) {
        const cn = uuidv4(); // auto generate CN
        const bookedOrder = new BookedOrder({
            cn,
            orderId: payload[0].orderId,
            courier: this.name,
            brand: brandCourier.name,
            payload,
        });
        await bookedOrder.save();

        return {
            courier: this.name,
            brand: brandCourier.name,
            status: "success",
            message: `Order created via ${this.name}`,
            cn,
            payload,
        };
    }

    async cancelOrder(orderId, brandCourier) {
        const order = await BookedOrder.findOne({ orderId, brand: brandCourier.name });
        if (!order) {
            return { status: "error", message: `No order found with OrderID: ${orderId}` };
        }
        await BookedOrder.deleteOne({ _id: order._id });
        return { status: "success", message: `Order with CN ${order.cn} cancelled`, cn: order.cn };
    }

}

module.exports = DummyCourier;
