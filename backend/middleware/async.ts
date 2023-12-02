import { NextFunction, Request, Response } from "express"

const jwt = require("jsonwebtoken")


interface ExtendedRequest extends Request {
    user?: any
}

const asyncWrapper = (
    handler: (req: ExtendedRequest, res: Response, next: NextFunction) => Promise<void>,
) => {
    return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(" ")[1]
            if (!token) throw new Error("No token provided")

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
            req.user = decoded

            await handler(req, res, next)
        } catch (err) {
            res.status(401).json({ message: "Unauthorized" })
        }
    }
}

const express = require("express")


module.exports = asyncWrapper