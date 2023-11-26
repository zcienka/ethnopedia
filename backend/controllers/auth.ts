const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
import { Request, Response } from "express"

const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const existingUser = await User.findOne({ username: req.body.username })
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
        })

        const user = await newUser.save()

        const token = jwt.sign({ username: user.username, firstName: user.firstName },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.EXPIRATION_TIME })

        return res.status(200).json({ token })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return res.status(404).send("Invalid username or password")
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(404).json("Invalid username or password")
        }

        const token = jwt.sign({ username: user.username, firstName: user.firstName },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.EXPIRATION_TIME })
        return res.status(200).json({ token })

    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = {
    registerUser,
    loginUser,
}