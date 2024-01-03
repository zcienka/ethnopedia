import express from "express"

const router = express.Router()

const {
    uploadArtworks,
    getArtworksForExport
} = require("../controllers/upload")

router.route("/").post(uploadArtworks)
router.route("/").get(getArtworksForExport)

module.exports = router