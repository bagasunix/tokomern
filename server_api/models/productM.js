const Mongoose = require("mongoose");

const productSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: Sting,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    color: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = Mongoose.model("Product", productSchema)