import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
    },
})

module.exports = mongoose.model("Category", CategorySchema)
