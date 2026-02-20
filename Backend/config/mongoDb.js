import mongoose, { connect } from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected" , () =>{
        console.log("DB connected")
    })
    await mongoose.connect("mongodb://localhost:27017/appointment_booking")
}

export default connectDB;