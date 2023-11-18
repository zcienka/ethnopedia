import mongoose from "mongoose"

const CollectionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
})

module.exports = mongoose.model("Collection", CollectionSchema)
