const BlueExCourier = require("../couriers/blueEx/blueEx");
const DummyCourier = require("../couriers/dummyOne/dummyOne");

class CourierFactory {
    static getCourier(shortKey) {
        switch (shortKey) {
            case "BlueEx":
                return new BlueExCourier();
            case "Dummy1":
                return new DummyCourier("Dummy1");
            case "Dummy2":
                return new DummyCourier("Dummy2");
            case "Dummy3":
                return new DummyCourier("Dummy3");
            default:
                throw new Error(`Courier ${shortKey} not supported`);
        }
    }
}

module.exports = CourierFactory;
