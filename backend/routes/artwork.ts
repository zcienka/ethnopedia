import express from "express"

const router = express.Router()

const {
    getAllArtworks,
    getArtwork,
    createArtwork,
    deleteArtwork,
    getFilteredArtworks,
} = require("../controllers/artworks")

router.get("/filter", getFilteredArtworks)
router.route("/").get(getAllArtworks)
router.route("/:artworkId").get(getArtwork)
router.route("/:artworkId").delete(deleteArtwork)
router.route("/:artworkId").post(createArtwork)

module.exports = router