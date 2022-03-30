import { createRequire } from 'module';
const require = createRequire(import.meta.url)

const mongoose = require('mongoose')

export const productSchema = new mongoose.Schema(
    {
    SellerId: {
        type:String, 
        required:true
    },
    SellerName: {
      type:String, 
      required:true
  },
    ProductName: {
      type:String, 
      required:true
    },
    Price: {type:String,
      required:true
    },
    Quantity: {type:Number,
      required:true
    },
    Description: {type:String,
        required:false
    },
    ImageAddress: {type:String,
        required:false
    },
  }
);


                {/*
                TO ADD:
                Condition (new, refurbished, used, broken)
                Quantity available (1-9999)
                Quantity to buy (input, how many user wants to buy)
                Shipping Info
                */}

const Product = mongoose.model('Product', productSchema);
export default Product;