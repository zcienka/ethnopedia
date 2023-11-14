import express from "express"

const router = express.Router()

const {
    getAllSubsections,
} = require("../controllers/subsections")

router.route("/").get(getAllSubsections)

module.exports = router