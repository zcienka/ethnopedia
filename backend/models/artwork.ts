import mongoose from "mongoose"

const artworkSchema = new mongoose.Schema({
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{
    strict: false,
    timestamps: true,
})

module.exports = mongoose.model("Artworks", artworkSchema)