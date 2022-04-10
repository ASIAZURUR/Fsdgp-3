const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Chatapp');
const Schema=mongoose.Schema;
var UserRegisterSchema = new Schema({
  
    firstName:{
        type: String,
        required: true,
        maxlength: 20
    },
    lastName:{
        type:String,
        maxlength: 20,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    phone:{
        type:String,
        required:true,
        // maxlength:12,
    
    },
  
    password:{
        type:String,
        required: true,
        minlength:8,
        // unique:true
    },
});

var User = mongoose.model('user', UserRegisterSchema);                     

module.exports = User;