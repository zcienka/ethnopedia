import mongoose from "mongoose"

const SubsectionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
})

module.exports = mongoose.model("Subsection", SubsectionSchema)
