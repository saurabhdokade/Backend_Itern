const mongoose = require("mongoose");
const validator = require("validator");


// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    gstin: {
        type: String,
        required: true,
    },
    
  
}, { timestamps: true });



module.exports = mongoose.model("UsersAuth", userSchema);