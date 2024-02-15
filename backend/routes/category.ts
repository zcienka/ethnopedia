import express from "express"

const router = express.Router()

const {
    getCategoriesById,
    getAllKeys
} = require("../controllers/categories")

router.route("/:id").get(getCategoriesById)
router.route("/test").get(getAllKeys)

module.exports = router
