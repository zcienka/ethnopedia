import express from "express"

const router = express.Router()

const {
    getAllCollections,
    getCollection,
    createCollection
} = require("../controllers/collections")

router.route("/").get(getAllCollections)
router.route("/").post(createCollection)
router.route("/:id").get(getCollection)

module.exports = router
