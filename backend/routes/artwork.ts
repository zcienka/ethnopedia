import express from "express"

const router = express.Router()

const {
    getAllArtworks,
    getArtwork,
    createArtwork,
    getFilteredArtworks,
    batchDeleteArtworks,
    getArtworksByCategory
} = require("../controllers/artworks")

router.get("/search", getFilteredArtworks)
router.route("/filter").get(getArtworksByCategory)
router.route("/").get(getAllArtworks)
router.route("/:artworkId").get(getArtwork)
router.route("/:artwork").delete(batchDeleteArtworks)
router.route("/:artworkId").post(createArtwork)

module.exports = router