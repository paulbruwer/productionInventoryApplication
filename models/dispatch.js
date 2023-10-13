const mongoose = require("mongoose");

// Schema to define our dispatch collection inside of the PIA database
let dispatchSchema = mongoose.Schema({
    dispatchNumber: {
        type: String,
        required: true
    },
    items: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        require: true
    }
});
// set Schema to model
let Dispatch = mongoose.model("dispatch", dispatchSchema);
// export
module.exports = Dispatch;