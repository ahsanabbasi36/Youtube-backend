//basically here in controller we are going to write the methods that will ultimately run whenver the route is hit
const asyncHandler = require('../utils/asyncHandler.js')
const uploadOnCloudinary = require('../utils/cloudinary.js')
const ApiError = require('../utils/ApiError.js')
const userModel = require('../models/user.model.js')
const ApiResponse = require('../utils/ApiResponse.js')
const mongoose =require('mongoose')
const registerUser = asyncHandler(async (req, res) => 
    {
        // //strong password

        //getting user details from frontend
        //validation(email correcrt ,username empty)checking field not empty
        //check if user already exist : username
        //check for images: =>avatar must exist
        //upload them onn cloudinary

        // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    //Below there is a syntax (destructuring)introduced in ES6 (ECMAScript 2015) that allows you to unpack values from arrays, or properties from objects, into distinct variables.
    const { email, username, password } = req.body
    //console.log("email: ", email);

    //Array Creation: [email, username, password] creates an array containing the values of the variables email, username, and password.   
    if (
        [ email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //here we want to check if new user is already registered or not thats why we are checking for username as well so that everyone has unique username
    const existedUser = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    // console.log(existedUser);
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    // console.log(req.files);

    // here we are getting files from multer and we are getting path in the avatarLocalPath 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required(couldnot get to path)")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required to upload on cloudinary")
    }

    const user = await userModel.create({
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await userModel.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )


    
module.exports= registerUser
