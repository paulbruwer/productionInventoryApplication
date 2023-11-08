const RawMaterials = require("../models/rawMaterials");

// check if certain product code exists in collection
exports.checkIfMaterialExists = async (req, res, next) => {
  try {
    const result = await RawMaterials.find({
      productCode: req.body.productCode,
    });
    if (result.length > 0) {
      req.quantity = result[0].quantity;
      next();
    } else {
      res.send({ message: "Product does not exists." });
    }
  } catch (error) {
    console.log(error);
    res.send({
      message: "Something went wrong while finding this product code.",
    });
  }
};

// retrieve list of all documents in this collection
exports.getRawMaterials = async (req, res, next) => {
  try {
    const result = await RawMaterials.find();
    res.send({ data: result });
  } catch (error) {
    console.log(error);
    res.send({
      message: "Could not get list of raw materials. Please reload the page.",
    });
  }
};

// update document in the raw materials collection
exports.updateRawMaterial = async (req, res) => {
  try {
    const newQuantity = req.body.quantity + req.quantity;
    const result = await RawMaterials.findOneAndUpdate(
      { productCode: req.body.productCode },
      { quantity: newQuantity, date: req.body.date }
    );
    res.send({ message: "Raw materials updated successfully" });
  } catch (error) {
    console.log(error);
    res.send({ message: "Something went wrong while updating Raw Materials." });
  }
};

// check if enough materials are available for production
exports.checkIfEnough = async (req, res, next) => {
  try {
    for (const key in req.composition) {
      const result = await RawMaterials.find({ productCode: key });
      const quantityInStock = await result[0].quantity;
      if (quantityInStock < req.composition[key] * req.body.quantity) {
        return res.send({ message: `Failed! Not enough ${key} in stock` });
      }
    }
    next();
  } catch (error) {
    console.log(error);
    res.send({ message: "Failed to check raw materials stock." });
  }
};

// reduce quantity field in document of raw materials collections
exports.useRawMaterials = async (req, res, next) => {
  try {
    for (const key in req.composition) {
      const result = await RawMaterials.findOneAndUpdate(
        { productCode: key },
        { $inc: { quantity: -1 * req.composition[key] * req.body.quantity } }
      );
    }
    next();
  } catch (error) {
    console.log(error);
    res.send({ message: "Something went wrong while manufacturing." });
  }
};
