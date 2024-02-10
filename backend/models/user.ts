import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    accountCreationDate: { type: Date, default: Date.now },
    // likedArtworks: [{
    //     artworkId: mongoose.Schema.Types.ObjectId,
    //     likeDate: Date
    // }],
    // recentViews: [{
    //     artworkId: mongoose.Schema.Types.ObjectId,
    //     viewDate: Date
    // }],
})

module.exports = mongoose.model("User", UserSchema)