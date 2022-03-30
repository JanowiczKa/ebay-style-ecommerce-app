// import mongoose from 'mongoose';
// // const { Schema } = mongoose;

import { createRequire } from 'module';
const require = createRequire(import.meta.url)

const mongoose = require('mongoose');

export const cartItemSchema = new mongoose.Schema(
    {
    ItemID: {
      type:String, 
      required:true
    },
    Quantity: {type:Number,
      required:true
    },
  }
);

const CartItem = mongoose.model('CartItem', cartItemSchema);
export default CartItem;