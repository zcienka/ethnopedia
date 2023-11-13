import { Request, Response } from "express"
import mongoose from "mongoose"

const asyncWrapper = require("../middleware/async")

const Artwork = require("../models/artwork")

const getAllArtworks = async (req: Request, res: Response, next: any) => {
    const page = typeof req.query.page === "string" ? parseInt(req.query.page) : 1
    const limit = typeof req.query.limit === "string" ? parseInt(req.query.limit) : 5

    const skip = (page - 1) * limit

    // const total = await Artwork.countDocuments()
    const total = 20
    // const totalPages = Math.ceil(total / limit)

    const artworks = await Artwork.find({}).skip(skip).limit(limit)
    const columnNames = Object.keys(artworks[0].toObject())

    if (columnNames.indexOf("Kategoria") != -1) {
        columnNames.splice(columnNames.indexOf("Kategoria"), 1)
        columnNames.unshift("Kategoria")
    }

    res.status(200).json({ artworks, columnNames })
}

const getArtwork = async (req: Request, res: Response, next: any) => {
    const artworkId = req.params.artworkId

    try {
        if (!mongoose.isValidObjectId(artworkId)) {
            return res.status(400).json(`Invalid artwork id: ${artworkId}`)
        }

        const artwork = await Artwork.findById(artworkId).exec()
        const columnNames = Object.keys(artwork.toObject())

        if (!artwork) {
            return res.status(404).json("Artwork not found")
        } else {
            return res.status(200).json({artwork, columnNames})
        }

    } catch (error) {
        next(error)
    }
}

const createArtwork = async (req: Request, res: Response, next: any) => {
    const title = req.body.title
    const description = req.body.description
    const img = req.body.img

    try {
        const newArtwork = await Artwork.create({
            title: title,
            description: description,
            img: img,
        })

        return res.status(201).json(newArtwork)
    } catch (error) {
        next(error)
    }
}

const deleteArtwork = async (req: Request, res: Response, next: any) => {
    const artworkId = req.params.artworkId

    try {
        if (!mongoose.isValidObjectId(artworkId)) {
            return res.status(400).json("Invalid artwork id")
        }

        const artwork = await Artwork.findById(artworkId).exec()

        if (!artwork) {
            return res.status(404).json("Artwork not found")
        }

        await artwork.remove()

        return res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllArtworks,
    getArtwork,
    createArtwork,
    deleteArtwork
}