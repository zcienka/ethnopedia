import express from "express"

const router = express.Router()

const {
    getAllArtworks,
    getArtwork,
    createArtwork,
    searchArtworks,
    batchDeleteArtworks,
    filterArtworks
} = require("../controllers/artworks")

router.get("/search", searchArtworks)
router.route("/filter").get(filterArtworks)
router.route("/").get(getAllArtworks)
router.route("/:artworkId").get(getArtwork)
router.route("/:artwork").delete(batchDeleteArtworks)
router.route("/:artworkId").post(createArtwork)

module.exports = router