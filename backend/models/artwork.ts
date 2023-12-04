import mongoose from "mongoose"

const ArtworkSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
    },
})

module.exports = mongoose.model("Artworks", ArtworkSchema)