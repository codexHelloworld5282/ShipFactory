const mongoose = require("mongoose");
require("./courier.model"); // ensures Courier is registered

const BrandCourierSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    location_id: Number,
    courier_id: { type: Number, ref: "Courier" },
    brand_id: Number,
    api_key: String,
    api_password: String,
    account: String,
    cost_center_code: String,
    service_type: String,
    is_api: Boolean,
    is_cancellation_api: Boolean,
    international: Boolean,
    client_courier_code: String,
    priority: Number,
    enabled: Boolean,
    is_dhl_commercial: Boolean,
    use_tracking_number: Boolean,
    created_at: Date,
    updated_at: Date,
    other_info: Array,
});

module.exports = mongoose.model("BrandCourier", BrandCourierSchema);
