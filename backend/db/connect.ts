import mongoose from "mongoose"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGO_URI ?? "mongodb://")

const connectDB = (url: any) => {
    return mongoose.connect(url ?? "mongodb://")
}

export const getMongoDBNativeDriverClient = () => {
    return client
}

const connectMongoDBNativeDriver = () => {
    const client = getMongoDBNativeDriverClient()
    return client.connect()
}

// module.exports = {
//     getMongoDBNativeDriverClient,
//     connectMongoDBNativeDriver,
// }

export default connectDB