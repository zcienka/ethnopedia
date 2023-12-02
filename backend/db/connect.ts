import mongoose from "mongoose"

const connectDB = (url: any) => {
    return mongoose.connect(url ?? "mongodb://")
}

module.exports = connectDB

export default connectDB