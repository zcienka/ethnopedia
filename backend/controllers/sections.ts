import { Request, Response } from "express"

const Section = require("../models/section")

const getAllSections = async (req: Request, res: Response, next: any) => {
    const sections = await Section.find({})
    res.status(200).json({ sections })
}

module.exports = {
    getAllSections
}