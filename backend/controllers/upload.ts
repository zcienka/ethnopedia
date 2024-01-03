import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import {getMongoDBNativeDriverClient} from "../db/connect"

const asyncWrapper = require("../middleware/async")
const Artwork = require("../models/artwork")
const ObjectId = require('mongodb').ObjectId;
const mongoClient = getMongoDBNativeDriverClient()

const uploadArtworks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
}


module.exports = {
    uploadArtworks
}