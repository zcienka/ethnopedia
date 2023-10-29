import asyncWrapper from "../middleware/async"

const Track = require("../models/track")
const getAllTracks = asyncWrapper(async (req: any, res: any) => {
    const tracks = await Track.find({})
    res.status(200).json({ tracks })
})

module.exports = {
    getAllTracks,
}