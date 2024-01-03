import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import {getMongoDBNativeDriverClient} from "../db/connect"

const asyncWrapper = require("../middleware/async")
const Artwork = require("../models/artwork")
const ObjectId = require('mongodb').ObjectId;
const mongoClient = getMongoDBNativeDriverClient()

const uploadArtworks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fileContents = req.body.fileContents
        const mongoQuery = fileContents.map((query: any) => JSON.parse(query))
        const result = await mongoClient.db().collection('artworks').insertMany(mongoQuery)
        return res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    uploadArtworks
}