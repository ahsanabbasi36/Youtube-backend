const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {

            type: String,
            required: true,
            trim: true,
            index: true
        },

        fullName: {

            type: String
        }
        ,
        avatar: {
            type: String,//cloudinary url
            required: true,

        },
        coverImage: {
            type: String,
        },
        watchHistory: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        password: {
            type: String,
            required: [true, "password is requried"]
        },
        refreshToken: {
            type: String
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

    })
//what i am going to do is that i am going to use a middleware called hooks where am going to use "pre" hook what is will do is that just before saving the password in the database it will hash it using bcrypt

0
//Below user model can communicate with directly with database beacuse it is aquired from mongoose.model

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;