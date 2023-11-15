import express from "express"

const router = express.Router()

const {
    getAllSections
} = require("../controllers/sections")

router.route("/").get(getAllSections)

module.exports = router
