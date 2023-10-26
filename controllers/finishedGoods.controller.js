const FinishedGoods = require('../models/finishedGoods');

// check if certain product code exists in collection
exports.checkIfGoodsExists = async (req, res, next) => {
    try {
        const result = await FinishedGoods.find({productCode:req.body.productCode});
        if (result.length > 0) {
            req.quantity = result[0].quantity;
            next();
        }else{
            res.send({message:"Product does not exists."});
        }
    } catch (error) {
        console.log(error);
        res.send({message:"Something went wrong while finding this product code."});
    }
}

// retrieve list of all documents in this collection
exports.getFinishedGoods = async (req, res, next) => {
    try {
        const result = await FinishedGoods.find();
        res.send({data:result});
    } catch (error) {
        console.log(error);
        res.send({message:"Could not get list of finished goods. Please reload the page."});
    }
}

// update document in collection
exports.updateFinishedGoods = async (req, res) => {
    try {
        const newQuantity = req.body.quantity + req.quantity;
        const result = await FinishedGoods.findOneAndUpdate({productCode:req.body.productCode},{quantity:newQuantity, date:req.body.date});
        res.send({message:"Finished goods updated successfully"});
    } catch (error) {
        console.log(error);
        res.send({message:"Something went wrong while updating finished goods."});
    }
}

// retrieve the composition object from documents in the finished goods collection
exports.getComposition = async (req, res, next) => {
    try {
        const result = await FinishedGoods.find({productCode:req.body.productCode});
        const composition = result[0].composition;
        req.composition = composition;
        next();
    } catch (error) {
        console.log(error);
        res.send({message:"Could not find composition"});
    }
}

// check if enough good are available for dispatch
exports.checkIfEnough = async (req, res, next) => {
    try {
        for (const key in req.body.items) {
            const result = await FinishedGoods.find({productCode:key});
            const quantityInStock = await result[0].quantity;
            if (quantityInStock < req.body.items[key]) {
                return res.send({message:`Failed! Not enough ${key} in stock`});
            }
        };
        next();
    } catch (error) {
        console.log(error);
        res.send({message:"Failed to check finished products stock."});
    };
    
}

// reduce the quantity field inside a document of the finished goods collection when dispatching
exports.dispatchFinishedGoods = async (req, res, next) =>{
    try {
        for (const key in req.body.items) {
            const result = await FinishedGoods.findOneAndUpdate({productCode:key}, {$inc: {quantity:-1 * req.body.items[key]}});
        }
        next();
    } catch (error) {
        console.log(error);
        res.send({message:"Something went wrong while dispatching items."});
    }
}