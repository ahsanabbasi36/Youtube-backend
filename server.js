// const mongoose=require('mongoose')a
const express = require('express')
const dotenv = require('dotenv').config()
const cors =require('cors')
const cookieParser =require('cookie-parser')
const upload = require('./middlewares/multer.middleware.js')
const app = express()
const PORT = process.env.PORT || 3000;
const connectDB = require('./db/db.js')
const cloudinary= require('./utils/cloudinary.js')


//middleware
//this is used to pass/accept the json data
app.use(express.json());
//Cross origin resource sharing.This allows the routes for incomming requests
app.use(cors())
//this helps to accept data comming from urls which is in strange format
app.use(express.urlencoded({extended:true}))
//To save the files like favicon ,images to this directory
app.use(express.static('public'))
//to parse the cookie
app.use(cookieParser())

//(req,file,cb)
// app.post('/upload', upload.single('file'), (req, res) => {
//     if (req.file) {z
//         res.json({ message: 'File uploaded successfully', fileInfo: req.file });
//     } else {
//         res.status(400).send('No file uploaded.');
//     }
// });


//import routes
    const userRouter= require('./routes/user.router.js')
    app.use('/users',userRouter)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening at http://localhost:${PORT}`);

            console.log('Database connection established.')}

     ) })
.catch ((error) => {
    console.log("error", error);

})






