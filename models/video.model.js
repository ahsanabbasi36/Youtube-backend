const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema ({
    videoFile:{
        type:String,//cloudinary
        required: true

    },
    thumbnail: {
        type:String,//cloudinary
        required:true
    },
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    duration: {
        type:String,
        required:true
    },
    views: {
        type:Number,
        required:true
    },
    isPublished:
    {
        type:Boolean,
        required: true,
    },
    owner: {
        type:Schema.Types.ObjectId,
        ref:"User"
    },

})