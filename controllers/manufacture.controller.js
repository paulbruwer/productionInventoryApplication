const Manufacture = require("../models/manufacture");

exports.getProductionData = async (req, res, next) => {
    try {
        const result = await Manufacture.find();
        res.send({data:result});
    } catch (error) {
        res.send({message:"Something went wrong"})
    }
}

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

exports.deleteProduction = async (req,res) => {
    try {
        await Manufacture.deleteOne({batchNumber:req.body.batchNumber});
    } catch (error) {
        res.send({message:"Something went wrong"});
    }
}