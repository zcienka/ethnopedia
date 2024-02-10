import { NextFunction, Request, Response } from "express"

const Artwork = require("../models/artwork")

const getArtworksQuickSearch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let searchQuery = req.query.searchQuery

        if (typeof searchQuery === "string" && searchQuery.trim() !== "") {
            const records = await Artwork.find({ $search: searchQuery }).exec()
            return res.status(200).json(records)
        } else {
            return res.status(400).json({ message: "Invalid search query" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getArtworksQuickSearch,
}
