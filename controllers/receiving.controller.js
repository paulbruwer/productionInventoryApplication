const Receiving = require("../models/receiving");

// retrieve list of all documents in this collection
exports.getReceivingData = async (req, res, next) => {
  try {
    const result = await Receiving.find();
    res.send({ data: result });
  } catch (error) {
    res.send({ message: "Something went wrong" });
  }
};

// get a single item form the receiving collection
exports.getReceivingItem = async (req, res) => {
  try {
    const result = await Receiving.find({ batchNumber: req.body.batchNumber });
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
exports.editReceivingItem = async (req, res) => {
  try {
    const result = await Receiving.findOneAndUpdate(
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
exports.newReceivingEntry = async (req, res, next) => {
  try {
    const newEntry = new Receiving(req.body);
    await newEntry.save();
    next();
  } catch (error) {
    console.log(error);
    res.send({ message: "Something went wrong while adding entry" });
  }
};

// remove document from collection
exports.deleteReceiving = async (req, res) => {
  try {
    await Receiving.deleteOne({ batchNumber: req.body.batchNumber });
  } catch (error) {
    res.send({ message: "Something went wrong" });
  }
};
