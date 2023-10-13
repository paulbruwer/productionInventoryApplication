const mongoose = require("mongoose");

// Schema to define our finished_goods collection inside of the PIA database
let finishedGoodsSchema = mongoose.Schema({
    productCode: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        require: true
    }
});
// set Schema to model
let FinishedGoods = mongoose.model("finished_goods", finishedGoodsSchema);
// export
module.exports = FinishedGoods;