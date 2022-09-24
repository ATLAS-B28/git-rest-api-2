const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    roles:{
        User:{
            type:Number,
            default:2002
        },
        Editor:Number,
        Admin:Number
    },
    password:{
        type:String,
        required:true
    },//RT after token  auth will be there
    refreshToken:String
})
module.exports = mongoose.model('User',userSchema)