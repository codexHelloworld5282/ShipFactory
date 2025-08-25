const BlueExAPI = require("./index");
const mongoose = require("mongoose");

// Booked order collection schema
const bookedOrderSchema = new mongoose.Schema({
    orderId: String,
    trackingNumber: String,
    courier: String,
    payload: Object,
    createdAt: { type: Date, default: Date.now },
});
const BookedOrder = mongoose.model("BookedOrder", bookedOrderSchema);

const BlueExService = {
    mapPayload: (orders) => {
        // Assuming only one order in array
        const order = orders[0];
        const products_detail = order.Products.map((p) => ({
            product_code: p.sku,
            product_name: p.name,
            product_price: p.price.toString(),
            product_weight: (p.properties.find(x => x.name === "weight_per_item")?.value || 0).toString(),
            product_quantity: p.quantity.toString(),
            product_variations: "", // You can customize
            sku_code: p.sku,
        }));

        return {
            shipper_name: order.Customer.name,
            shipper_email: order.Customer.email,
            shipper_contact: order.Customer.phone,
            shipper_address: order.location.address,
            shipper_city: order.originCity,
            customer_name: order.Customer.shipping.firstName + " " + order.Customer.shipping.lastName,
            customer_email: order.Customer.shipping.email,
            customer_contact: order.Customer.shipping.phone,
            customer_address: order.Customer.shipping.address,
            customer_city: order.Customer.shipping.city,
            customer_country: "PK",
            customer_comment: "",
            shipping_charges: order.shippingPricePKR.toString(),
            payment_type: order.codAmount > 0 ? "COD" : "PREPAID",
            service_code: "BE",
            total_order_amount: order.totalAmountPKR.toString(),
            total_order_weight: order.Products.reduce((sum, p) => sum + Number(p.properties.find(x => x.name === "weight_per_item")?.value || 0) * p.quantity, 0).toString(),
            order_refernce_code: order.orderId,
            fragile: "N",
            parcel_type: "P",
            insurance_require: "N",
            insurance_value: "0",
            testbit: "Y",
            cn_generate: "Y",
            multi_pickup: "Y",
            products_detail,
        };
    },

    createConsignment: async (orders, courierDetails) => {
        try {
            const payload = BlueExService.mapPayload(orders);
            const auth = { username: courierDetails.apiKey, password: courierDetails.apiPassword };
            const endpoint = courierDetails.url_mapping.book;

            const response = await BlueExAPI.post(endpoint, payload, auth);

            // Save booked order to DB
            const bookedOrder = new BookedOrder({
                orderId: orders[0].orderId,
                trackingNumber: response?.tracking_number || "",
                courier: courierDetails.name,
                payload,
            });
            await bookedOrder.save();

            return response;
        } catch (err) {
            console.error("Error in createConsignment:", err);
            throw err;
        }
    },

    cancelConsignment: async (orders, bookingDetails, courierDetails) => {
        try {
            const payload = { AWBNo: [bookingDetails.trackingNumber] };
            const auth = { username: courierDetails.apiKey, password: courierDetails.apiPassword };
            const endpoint = courierDetails.url_mapping.cancel;

            const response = await BlueExAPI.post(endpoint, payload, auth);
            return response;
        } catch (err) {
            console.error("Error in cancelConsignment:", err);
            throw err;
        }
    },
};

module.exports = BlueExService;
