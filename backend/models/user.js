// import mongoose from 'mongoose';
// const { Schema } = mongoose;

import { createRequire } from 'module';
const require = createRequire(import.meta.url)

const mongoose = require('mongoose')


import {cartItemSchema} from './cartItem.js';

const userSchema = new mongoose.Schema(
    {
    name: {type: String, required:true},
    password: {type: String, required:true},
    email: {type: String, required:true},

    Rating: {type: [Number], default:0.0, required:false},
    Ratings: {type: Number, default:0, required:false},

    Cart: {type:[cartItemSchema], required:false},
    
    Selling: {type:[String], required:false},

    isAdmin: {type: Boolean, default:false, required:true}
  }
);

const User = mongoose.model('User', userSchema);
export default User;