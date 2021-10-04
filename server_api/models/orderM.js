const Mongoose = require("mongoose");

const orderSchema = new Mongoose.Schema({
    userId: {
        type: String, required: true,
    },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ],
    amounts: {
        type: Number, required: true
    },
    address: {
        type: Object, required: true
    },
    status: {
        type: String, default: "Panding"
    }
}, { timestamps: true });

module.exports = Mongoose.model("Order", orderSchema)