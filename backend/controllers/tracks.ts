import asyncWrapper from "../middleware/async"

const Track = require("../models/track")

const getAllTracks = asyncWrapper(async (req: any, res: any) => {
    const tracks = await Track.find({})
    const columnNames = Object.keys(tracks[0].toObject())
    res.status(200).json({tracks, columnNames})
})

module.exports = {
    getAllTracks,
}