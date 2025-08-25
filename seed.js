// seed.js
const mongoose = require("mongoose");
const Courier = require("./models/courier.model.js");
const BrandCourier = require("./models/BrandCourier.js");
require("dotenv").config();

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Connected to MongoDB");


        await Courier.deleteMany({});
        await BrandCourier.deleteMany({});


        const blueExCourier = await Courier.create({
            _id: 20,
            name: "BlueEx",
            email: "admin@shopistan.pk",
            short_key: "BlueEx",
            old_courier_id: "",
            is_bulk: false,
            request_limit: null,
            is_dummy: false,
            enabled: true,
            status_mapping: {
                CANCELLED: [],
                DISPATCHED: ["Booked"],
                InProcess: ["InProcess", "draft"],
                NOT_IN_USE: ["NOT_IN_USE"],
                ORDER_DELIVERED: ["aBooked"],
                UNTRACKED: ["UNTRACKED"],
                PAID: ["paid", "Paid", ""],
                ORDER_RETURN_ACCEPTED: [
                    "aBooked", "Returned to Vendor", "Shipment  Returned",
                    "RETURN SUBMITTED", "RETURNED", "Return", "Refused", "REFUSED",
                    "REFUSED DELIVE", "RS", "Returned to shipper", "Returned",
                    "Return To Origin", "Return To Shipper", "RETURN_TO_ORIGIN",
                    "RETURN_TO_SHIPPER", "RSReturn to Shipper",
                    "Return  Delivered to Shipper", "returned",
                    "RETURN TO SHIPPER", "Canclled", "Cancelled", "Order is Cancelled",
                    "canceled", "OK", "Delivered", "DELIVERED", "Shipment  Delivered",
                    "delivered", "Delivered to Customer", "dispatched", "Dispatched",
                    "In Transit", "Out For Delivery", "IT",
                    "Shipment picked up (PU) First", "Arrived at TCS Facility",
                    "In Transit (IT)", "Scheduled for delivery (SD)",
                    "On hold at TCS facility", "Courier out for delivery",
                    "Departed From Origin"
                ],
                PENDING_RETURN: ["aBooked"],
            },
            url_mapping: {
                book: "https://requestly.dev/api/mockv2/book?rq_uid=1n9HNbT5EHYj3A07YRWaBXpSDlq13",
                cancel: "https://requestly.dev/api/mockv2/cancel?rq_uid=1n9HNbT5EHYj3A07YRWaBXpSDlq13",
                tracking_store_front: "https://www.blue-ex.com/tracking?trackno=",
            },
            created_at: new Date("2034-07-24T11:05:18.491Z"),
            updated_at: new Date("2034-07-24T11:05:18.491Z"),
            parallel_limit: 1,
            is_payment_api: true,
        });

        await BrandCourier.create({
            _id: 21,
            name: "BlueEx-Xstak-Xap",
            location_id: null,
            courier_id: blueExCourier._id,
            brand_id: 845,
            api_key: "demo",
            api_password: "demo123456",
            account: "KHI-00000",
            cost_center_code: "64jkuyeh75hkjstgh87",
            service_type: "n",
            is_api: true,
            is_cancellation_api: true,
            international: false,
            client_courier_code: "BlueEx",
            priority: -1,
            enabled: true,
            is_dhl_commercial: false,
            use_tracking_number: false,
            created_at: new Date("2023-08-21T17:23:09.553Z"),
            updated_at: new Date("2024-02-21T11:43:31.909Z"),
            other_info: [],
        });


        for (let i = 1; i <= 3; i++) {
            const courierId = 30 + i;   // 31, 32, 33
            const brandId = 900 + i;    // 901, 902, 903

            const dummyCourier = await Courier.create({
                _id: courierId,
                name: `Dummy${i}`,
                email: `dummy${i}@example.com`,
                short_key: `Dummy${i}`,
                is_bulk: false,
                is_dummy: true,
                enabled: true,
                status_mapping: {},
                url_mapping: {
                    book: `https://dummy${i}.com/api/book`,
                    cancel: `https://dummy${i}.com/api/cancel`,
                    tracking_store_front: `https://dummy${i}.com/track/`,
                },
                created_at: new Date(),
                updated_at: new Date(),
                parallel_limit: 1,
                is_payment_api: false,
            });

            await BrandCourier.create({
                _id: brandId,
                name: `DummyBrand${i}`,
                courier_id: dummyCourier._id,
                brand_id: 1000 + i,
                api_key: `dummy${i}_key`,
                api_password: `dummy${i}_password`,
                account: `ACC-${i}`,
                cost_center_code: `COST-${i}`,
                service_type: "n",
                is_api: true,
                is_cancellation_api: true,
                international: false,
                client_courier_code: `Dummy${i}`,
                priority: -1,
                enabled: true,
                is_dhl_commercial: false,
                use_tracking_number: false,
                created_at: new Date(),
                updated_at: new Date(),
                other_info: [],
            });
        }

        console.log("✅ Seed data inserted successfully");
        process.exit();
    } catch (err) {
        console.error("❌ Seed error:", err);
        process.exit(1);
    }
}


seed();