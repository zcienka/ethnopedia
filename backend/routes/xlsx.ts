import express from "express"

const router = express.Router()

const {
    getXlsxWithAllData,
    getAllCaterories
} = require("../controllers/xlsx")

router.route("/:collectionName").get(getXlsxWithAllData)
router.route("/keys/:collectionName").get(getAllCaterories)

module.exports = router