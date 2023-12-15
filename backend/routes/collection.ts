import express from "express"

const router = express.Router()

const {
    getAllCollections,
    getCollection,
    createCollection,
    batchDeleteCollections,
    artworksInCategory
} = require("../controllers/collections")

router.route("/:category/artworks").get(artworksInCategory)
router.route("/").get(getAllCollections)
router.route("/").post(createCollection)
router.route("/:id").get(getCollection)
router.route("/:collection").delete(batchDeleteCollections)

module.exports = router
