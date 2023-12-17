import mongoose from "mongoose"

const ArtworkSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
    },

},{
    strict: false
})

module.exports = mongoose.model("Artworks", ArtworkSchema, )