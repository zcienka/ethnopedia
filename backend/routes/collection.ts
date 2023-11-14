import express from "express"

const router = express.Router()

const {
    getAllCollections,
} = require("../controllers/collections")

router.route("/").get(getAllCollections)

module.exports = router