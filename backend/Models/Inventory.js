const mongoose = require('mongoose')

const {INVENTORY_COLLECTION} = require('../Constants/constants.js')

// import mongoose from "mongoose";
// import {INVENTORY_COLLECTION} from "../Constants/constants.js";

// Define schema for Inventory to be stored in the database
const Inventory = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
},{timestamps:true});

// Define model for the Inventory schema
module.exports =InventoryModel = mongoose.model(
  INVENTORY_COLLECTION,
  Inventory
);
