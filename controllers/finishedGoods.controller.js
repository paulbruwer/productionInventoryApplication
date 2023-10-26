const FinishedGoods = require('../models/finishedGoods');

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

exports.getFinishedGoods = async (req, res, next) => {
    try {
        const result = await FinishedGoods.find();
        res.send({data:result});
    } catch (error) {
        console.log(error);
        res.send({message:"Could not get list of finished goods. Please reload the page."});
    }
}

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