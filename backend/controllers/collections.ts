import { Request, Response } from "express"

const Collection = require("../models/collection")

const getAllCollections = async (req: Request, res: Response, next: any) => {
    const collections = await Collection.find({})
    res.status(200).json({ collections })
}

module.exports = {
    getAllCollections
}