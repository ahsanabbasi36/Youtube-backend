//here we are going to write a wrapper function which will execute other functions
//we will make a method and export it 
//It can be done in two ways
//1:try catch
//since asynHandler is a higher order function:It is a function that accept functions as parameter and can return them 
//Its syntax is following
// const asyncHandler = (funct)=> async(req,res,next)=>{
// try {
//     await funct(req,res,next)
// } catch (error) {
//     res.status(err.code ||500).json(
//         {
//             success:false,
//             message: err.message
//         }
//     )
    
// }
// }




//2:Promises
//Below there is Higher order Function 
//This function, asyncHandler, is designed to take another function (requestHandler) as its argument and returns a new function that automatically handles promises and errors.
const asyncHandler =(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}
module.exports= asyncHandler;    