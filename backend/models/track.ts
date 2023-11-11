import mongoose from "mongoose"

const TrackSchema = new mongoose.Schema({
    name: {
        type: String,
    },
})

module.exports = mongoose.model("Track", TrackSchema)