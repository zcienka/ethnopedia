import asyncWrapper from "../middleware/async"

const Track = require("../models/track")


const getAllTracks = asyncWrapper(async (req: any, res: any) => {
    const page = req.query.page ? parseInt(req.query.page) : 1
    const limit = req.query.limit ? parseInt(req.query.limit) : 5

    const skip = (page - 1) * limit

    // const total = await Track.countDocuments()
    const total = 20
    const totalPages = Math.ceil(total / limit)

    const tracks = await Track.find({}, { _id: 0 }).skip(skip).limit(limit)
    const columnNames = Object.keys(tracks[0].toObject())

    if (columnNames.indexOf("Kategoria") != -1) {
        columnNames.splice(columnNames.indexOf("Kategoria"), 1)
        columnNames.unshift("Kategoria")
    }

    // res.status(200).json({ tracks, columnNames, page, totalPages })
    res.status(200).json({ tracks, columnNames })
})

module.exports = {
    getAllTracks,
}