import express from "express"

const router = express.Router()

const {
    getAllArtworks,
    getArtwork,
    createArtwork,
    deleteArtwork,
    getFilteredArtworks,
} = require("../controllers/artworks")

router.route("/").get(getAllArtworks)
router.route("/:artworkId").get(getArtwork)
// router.route("/:artworkId").delete(deleteArtwork)
// router.route("/:artworkId").post(createArtwork)
// router.get("/categories/:category/section/:section", getFilteredArtworks)

module.exports = router