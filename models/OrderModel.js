const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    products: {
        type: String
    },
    clientname: {
        type: String

    },
    city: {
        type: String

    },
    address: {
        type: String

    },
    pincode: {
        type: String

    },
    email: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
