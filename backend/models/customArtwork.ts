import mongoose from "mongoose"

const CustomArtworkSchema = new mongoose.Schema({
    any: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model('artworks', CustomArtworkSchema, 'artworks')