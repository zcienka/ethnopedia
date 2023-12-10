import mongoose from "mongoose"
import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI ?? "mongodb://")

export const connectDB = (url: any) => {
    return mongoose.connect(url ?? "mongodb://")
}

export const getMongoClient = () => {
    return client
}

export const connectDBNative = () => {
    const client = getMongoClient()
    return client.connect();
}

module.exports = {connectDB, connectDBNative, getMongoClient}