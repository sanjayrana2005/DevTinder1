const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        trim: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("your password is not strong : " + value)
            }
        }
    },
    gender: {
        type: String,
        enum:{
            values:["male", "female", "other"],
            message:`{VALUE} is not a valid gender type`
        }
        // validate(value) {
        //     if (!["male", "female", "other"].includes(value)) {
        //         throw new Error("Gender in not valid")
        //     }
        // }
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo url: " + value)
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about"
    },
    skills: {
        type: [String],
    }

}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;