import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/taskManagement`)
    console.log("database connnected")
  } catch (error) {
    console.error('MongoDb connection error', error)
    process.exit(1)
  }
}

export default connectDB;

