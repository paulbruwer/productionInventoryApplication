const mongoose = require("mongoose");

// Schema to define our manufacture collection inside of the PIA database
let manufactureSchema = mongoose.Schema({
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
    composition: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        require: true
    }
});
// set Schema to model
let Manufacture = mongoose.model("manufacture", manufactureSchema);
// export
module.exports = Manufacture;