// courier.service.js
const CourierFactory = require("../service/courier.factory");
const BrandCourier = require("../models/BrandCourier");

class CourierService {
    // static async getCourierImpl(brandCourierId) {
    //     const brandCourier = await BrandCourier.findOne({ _id: Number(brandCourierId) }).populate("courier_id");
    //
    //
    //     if (!brandCourier) throw new Error(`BrandCourier not found for _id ${brandCourierId}`);
    //
    //     const courierImpl = CourierFactory.getCourier(brandCourier.courier_id.short_key);
    //     if (!courierImpl) throw new Error(`Courier implementation not found for ${brandCourier.courier_id.short_key}`);
    //     return { courierImpl, brandCourier };
    // }
    static async getCourierImpl(brandCourierId) {
        console.log("Checking DB name:", BrandCourier.db.name);

        const count = await BrandCourier.countDocuments();
        console.log("Total brandcouriers in this DB:", count);

        const brandCourier = await BrandCourier.findOne({ _id: Number(brandCourierId) }).populate("courier_id");
        console.log("Query result:", brandCourier);

        if (!brandCourier) throw new Error(`BrandCourier not found for _id ${brandCourierId}`);

        const courierImpl = CourierFactory.getCourier(brandCourier.courier_id.short_key);

        if (!courierImpl) throw new Error(`Courier implementation not found for ${brandCourier.courier_id.short_key}`);

        return { courierImpl, brandCourier };
    }


    static async  createOrder(payload, brandCourierId) {
        const { courierImpl, brandCourier } = await this.getCourierImpl(brandCourierId);
        return courierImpl.createOrder(payload, brandCourier);
    }

    static async cancelOrder(orderId, brandCourierId) {
        const { courierImpl, brandCourier } = await this.getCourierImpl(brandCourierId);
        return courierImpl.cancelOrder(orderId, brandCourier);
    }
}

module.exports = CourierService;
