const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverSchema = new Schema({
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
    contact:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    salaryPackage:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    customers: [
        {
           type: Schema.Types.ObjectId,
           ref:'Customer'
        }
    ],
    creator:{
        type:Schema.Types.ObjectId,
        ref: 'Admin',
        required:true
    }
});

module.exports = mongoose.model('Dboy' , deliverSchema);