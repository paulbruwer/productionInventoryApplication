const Receiving = require("../models/receiving");

exports.getReceivingData = async (req, res, next) => {
    try {
        const result = await Receiving.find();
        res.send({data:result});
    } catch (error) {
        res.send({message:"Something went wrong"})
    }
}

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

exports.deleteReceiving = async (req,res) => {
    try {
        await Receiving.deleteOne({batchNumber:req.body.batchNumber});
    } catch (error) {
        res.send({message:"Something went wrong"});
    }
}