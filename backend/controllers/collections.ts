import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"

const Collection = require("../models/collection")
const Artwork = require("../models/artwork")
const asyncWrapper = require("../middleware/async")

const getAllCollections = async (req: Request, res: Response, next: any) => {
    const collections = await Collection.find({})
    const pipeline = [
        {
            $match: { "Kategoria": { $exists: true } },
        },
        {
            $group: {
                _id: "$Kategoria",
                count: { $sum: 1 },
            },
        },
    ]

    const artworks = await Artwork.aggregate(pipeline)
    let artworkMap = new Map()

    artworks.forEach((artwork: any) => {
        artworkMap.set(artwork._id, artwork.count)
    })

    let combinedData = new Map()

    collections.forEach((collection: any) => {
        combinedData.set(collection._id, {
            id: collection._id,
            name: collection.name,
            description: collection.description,
            artworksCount: artworkMap.get(collection.name) || 0,
            // categoriesCount: artworkMap.get(collection.name) || 0,
        })
    })

    let combinedArray = Array.from(combinedData.values())

    res.status(200).json({ collections: combinedArray })
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
            return res.status(200).json({ collection, columnNames })
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