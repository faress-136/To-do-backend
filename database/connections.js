import mongoose from 'mongoose'

export const connection = ()=>{

    mongoose.set('strictQuery', true)
    
    mongoose.connect(process.env.connectionURL)
    .then(()=>{
        console.log("Connected to MongoDb ....");
    })    
    .catch((err)=>{
        console.log("Error in connectin to MongoDB ....");
    })
}