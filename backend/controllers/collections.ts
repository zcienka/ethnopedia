import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"

const Collection = require("../models/collection")
const asyncWrapper = require("../middleware/async")

const getAllCollections = async (req: Request, res: Response, next: any) => {
    const collections = await Collection.find({})
    res.status(200).json({ collections })
}

const getCollection = async (req: Request, res: Response, next: any) => {
    const collectionId = req.params.collectionId

    try {
        if (!mongoose.isValidObjectId(collectionId)) {
            return res.status(400).json(`Invalid collection id: ${collectionId}`)
        }

        const collection = await Collection.findById(collectionId).exec()
        const columnNames = Object.keys(collection.toObject())

        if (!collection) {
            return res.status(404).json("Collection not found")
        } else {
            return res.status(200).json({collection, columnNames})
        }

    } catch (error) {
        next(error)
    }
}

const createCollection = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name
    const description = req.body.description

    try {
        const newCollection = await Collection.create({
            name: name,
            description: description,
        })

        return res.status(201).json(newCollection)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCollections,
    getCollection,
    createCollection,
}