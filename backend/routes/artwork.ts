import express from "express"

const router = express.Router()

const {
    getAllArtworks,
    getArtwork,
    createArtwork,
    getFilteredArtworks,
    batchDeleteArtworks
} = require("../controllers/artworks")

router.get("/filter", getFilteredArtworks)
router.route("/").get(getAllArtworks)
router.route("/:artworkId").get(getArtwork)
router.route("/:artwork").delete(batchDeleteArtworks)
router.route("/:artworkId").post(createArtwork)

module.exports = router