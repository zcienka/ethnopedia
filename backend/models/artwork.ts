import mongoose from "mongoose"

const ArtworkSchema = new mongoose.Schema({
    name: {
        type: String,
    },
})

module.exports = mongoose.model("Track", ArtworkSchema)