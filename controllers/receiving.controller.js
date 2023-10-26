const Receiving = require("../models/receiving");

// retrieve list of all documents in this collection
exports.getReceivingData = async (req, res, next) => {
    try {
        const result = await Receiving.find();
        res.send({data:result});
    } catch (error) {
        res.send({message:"Something went wrong"})
    }
}

// add document to collection
exports.newReceivingEntry = async (req, res, next) => {
    try {
        const newEntry = new Receiving(req.body);
        await newEntry.save();
        next();
    } catch (error) {
        console.log(error)
        res.send({message:"Something went wrong while adding entry"})
    }
}

// remove document from collection
exports.deleteReceiving = async (req,res) => {
    try {
        await Receiving.deleteOne({batchNumber:req.body.batchNumber});
    } catch (error) {
        res.send({message:"Something went wrong"});
    }
}