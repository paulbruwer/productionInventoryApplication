const Dispatch = require("../models/dispatch");

// retrieve list of all documents in this collection
exports.getDispatchData = async (req, res, next) => {
    try {
        const result = await Dispatch.find();
        res.send({data:result});
    } catch (error) {
        res.send({message:"Something went wrong"})
    }
}

// add document to collection
exports.newDispatchEntry = async (req, res) => {
    try {
        const dispatchNumber = req.body.dispatchNumber;
        const items = req.body.items;
        const date = req.body.date;
        const newEntry = new Dispatch({dispatchNumber:dispatchNumber, items:items, user:req.email, date:date});
        await newEntry.save();
        res.send({message:"Dispatch successfully recorded."})
    } catch (error) {
        console.log(error)
        res.send({message:"Something went wrong while adding entry"})
    }
}

// remove document from collection
exports.deleteDispatch = async (req,res) => {
    try {
        await Dispatch.deleteOne({dispatchNumber:req.body.dispatchNumber})
    } catch (error) {
        res.send({message:"Something went wrong"});
    }
}