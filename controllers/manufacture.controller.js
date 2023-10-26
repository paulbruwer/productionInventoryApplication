const Manufacture = require("../models/manufacture");

// retrieve list of all documents in this collection
exports.getProductionData = async (req, res, next) => {
    try {
        const result = await Manufacture.find();
        res.send({data:result});
    } catch (error) {
        res.send({message:"Something went wrong"})
    }
}

// add document to collection
exports.newProductionEntry = async (req, res, next) => {
    try {
        const newEntry = new Manufacture(req.body);
        await newEntry.save();
        next();
    } catch (error) {
        console.log(error)
        res.send({message:"Something went wrong while adding entry"})
    }
}

// remove document from collection
exports.deleteProduction = async (req,res) => {
    try {
        await Manufacture.deleteOne({batchNumber:req.body.batchNumber});
    } catch (error) {
        res.send({message:"Something went wrong"});
    }
}