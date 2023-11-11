import { NextFunction, Request, Response } from "express"
import { verifyJwt } from "../utils/jwt"

const asyncWrapper = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const accessToken = (req.get("authorization") || "").replace(
        /^Bearer\s/,
        "",
    )

    if (!accessToken) {
        return next()
    }

    const decoded = verifyJwt(accessToken, "accessTokenPublicKey")

    if (decoded) {
        res.locals.user = decoded
    }

    return next()
}

const express = require("express")

export default asyncWrapper