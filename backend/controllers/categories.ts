import { NextFunction, Request, Response } from "express"

const Category = require("../models/category")

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    const page = typeof req.query.page === "string" ? parseInt(req.query.page) : 1
    const limit = typeof req.query.limit === "string" ? parseInt(req.query.limit) : 5

    const skip = (page - 1) * limit

    // const total = await Category.countDocuments()
    // const totalPages = Math.ceil(total / limit)

    // const categories = await Category.find({}).skip(skip).limit(limit)
    const categories = await Category.find({}).exec()

    res.status(200).json(categories)
}

module.exports = {
    getAllCategories
}