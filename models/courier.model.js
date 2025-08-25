const mongoose = require("mongoose");

const CourierSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    email: String,
    short_key: String,
    old_courier_id: String,
    is_bulk: Boolean,
    is_dummy: Boolean,
    enabled: Boolean,
    status_mapping: Object,
    url_mapping: {
        book: String,
        cancel: String,
        tracking_store_front: String,
    },
    created_at: Date,
    updated_at: Date,
    parallel_limit: Number,
    is_payment_api: Boolean,
    request_limit: Number,
});

module.exports = mongoose.model("Courier", CourierSchema);
