import express from "express"

const router = express.Router()

const {
    getArtworksQuickSearch,
} = require("../controllers/general")

router.route("/search").get(getArtworksQuickSearch)

module.exports = router
