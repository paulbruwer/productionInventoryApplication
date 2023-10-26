const mongoose = require("mongoose");

// Schema to define our receiving collection inside of the PIA database
let receivingSchema = mongoose.Schema({
    batchNumber: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        require: true
    }
});
// set Schema to model
let Receiving = mongoose.model("receiving", receivingSchema);
// export
module.exports = Receiving;