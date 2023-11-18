import express from "express"

const router = express.Router()

const {
    getAllSections,
    getSectionsByCollectionName
} = require("../controllers/sections")

router.route("/").get(getAllSections)
router.route("/:collectionName").get(getSectionsByCollectionName)

module.exports = router
