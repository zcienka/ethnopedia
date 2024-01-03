import express from "express"

const router = express.Router()

const {
    uploadArtworks,
} = require("../controllers/upload")

router.route("/").post(uploadArtworks)

module.exports = router