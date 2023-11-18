import express from "express"

const router = express.Router()

const {
    getAllCollections,
    getCollection
} = require("../controllers/collections")

router.route("/").get(getAllCollections)
router.route("/:id").get(getCollection)

module.exports = router
