const mongoose = require("mongoose");

// Schema to define our raw_materials collection inside of the PIA database
let materialsSchema = mongoose.Schema({
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
let RawMaterials = mongoose.model("raw_materials", materialsSchema);
// export
module.exports = RawMaterials;