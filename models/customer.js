const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    deliverySchedule:[
        {
            type:String,
            required:true
        }
    ],
    payOut:{
        type:String,
        required:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref: 'Admin',
        required:true
    }
});
module.exports = mongoose.model('Customer' , customerSchema);