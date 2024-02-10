import express from "express"

const router = express.Router()

const {
    getAllCategories,
    getAllKeys
} = require("../controllers/categories")

router.route("/").get(getAllCategories)
router.route("/test").get(getAllKeys)

module.exports = router
