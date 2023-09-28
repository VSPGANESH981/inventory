const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const InventoryModel = require("../../Models/Inventory");
const uuid = require("uuid").v4;
const AWS = require("aws-sdk");

// POST request to add Inventory to database
router.post("/addItem", async (req, res) => {
  try {
    // Create a new instance of the Inventory Model with data from the request body
    const inventory = InventoryModel(req.body);
    // Save the data to the database
    await inventory.save(function (err, result) {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
        return;
      }
      // Send a success response with the added data
      res.status(StatusCodes.CREATED).json(result);
    });
  } catch (err) {
    // Send an error response if there is a problem adding the data
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

// POST request to update Inventory to database
router.post("/updateItem", async (req, res) => {
  try {
    const id = req.body._id;
    const name = req.body.name;
    const quantity = req.body.quantity;
    const result = await InventoryModel.updateOne(
      { _id: id },
      { $set: { name: name, quantity: quantity } }
    );
    // Send a success response with the result
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    // Send an error response if there is a problem updating
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

// GET request to get Inventory from database
router.get("/getItems", async (req, res) => {
  try {
    // Find items in the collection with pagination options
    const items = await InventoryModel.find().sort({ createdAt: -1 });

    // Send a success response with the retrieved data and pagination info
    const totalCount = await InventoryModel.countDocuments();
    const response = {
      totalCount,
      items,
    };
    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    // Send an error response if there is a problem retrieving the data
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

router.post("/deleteItem", async (req, res) => {
  try {
    await InventoryModel.deleteOne({ _id: req.body._id });
    res.status(StatusCodes.OK).json({ message: "item deleted successfully" });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});
module.exports = router;
