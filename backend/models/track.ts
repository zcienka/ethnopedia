const mongoose = require('mongoose')

const TrackSchema = new mongoose.Schema({
    name: {
        type: String,
    },
})

module.exports = mongoose.model('Track', TrackSchema)