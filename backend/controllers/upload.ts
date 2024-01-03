import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import {getMongoDBNativeDriverClient} from "../db/connect"
import { ObjectId } from "bson"

const asyncWrapper = require("../middleware/async")
const Artwork = require("../models/artwork")
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

const getArtworksForExport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ids: any = req.query.ids
        let result: any = []
        for(const id in ids) {
            const record = await mongoClient.db().collection('artworks').find({ _id: new ObjectId(ids[id]) }).toArray()
            if(record[0]) {
                result = [...result, ...record]
            }
        }
        return res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    uploadArtworks,
    getArtworksForExport
}