const Manufacture = require("../models/manufacture");

// retrieve list of all documents in this collection
exports.getProductionData = async (req, res, next) => {
  try {
    const result = await Manufacture.find();
    res.send({ data: result });
  } catch (error) {
    res.send({ message: "Something went wrong" });
  }
};

// get a single item form the receiving collection
exports.getProductionItem = async (req, res) => {
  try {
    const result = await Manufacture.find({
      batchNumber: req.body.batchNumber,
    });
    if (result[0]) {
      res.send({ data: result[0] });
    } else {
      res.send({ message: "This Batch number does not exist" });
    }
  } catch (error) {
    res.send({ message: "Something went wrong." });
  }
};

// update a single item in the receiving collection.
exports.editProductionItem = async (req, res) => {
  try {
    const result = await Manufacture.findOneAndUpdate(
      { batchNumber: req.body.batchNumber },
      {
        batchNumber: req.body.newBatchNumber,
        productCode: req.body.productCode,
        quantity: req.body.quantity,
        date: req.body.date,
      }
    );
    res.send({ message: "Updated successfully" });
  } catch (error) {
    res.send({ message: "Something went wrong while updating." });
  }
};

// add document to collection
exports.newProductionEntry = async (req, res, next) => {
  try {
    const newEntry = new Manufacture(req.body);
    await newEntry.save();
    next();
  } catch (error) {
    console.log(error);
    res.send({ message: "Something went wrong while adding entry" });
  }
};

// remove document from collection
exports.deleteProduction = async (req, res) => {
  try {
    await Manufacture.deleteOne({ batchNumber: req.body.batchNumber });
  } catch (error) {
    res.send({ message: "Something went wrong" });
  }
};
