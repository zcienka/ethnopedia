import express from "express"

const router = express.Router()

const {
    getAllTracks,
} = require("../controllers/tracks")

router.route("/").get(getAllTracks)

module.exports = router