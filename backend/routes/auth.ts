const express = require("express")
const router = express.Router()

const {
    registerUser,
    loginUser,
    deleteUser
} = require("../controllers/auth")

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/:userId").delete(deleteUser)

module.exports = router