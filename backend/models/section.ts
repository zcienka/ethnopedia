import mongoose from "mongoose"

const SectionSchema = new mongoose.Schema({
    name: {
        type: String,
    }
})

module.exports = mongoose.model("Sections", SectionSchema)
