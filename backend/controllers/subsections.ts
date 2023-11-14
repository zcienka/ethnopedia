import { Request, Response } from "express"

const Subsection = require("../models/subsection")

const getAllSubsections = async (req: Request, res: Response, next: any) => {
    const subsections = await Subsection.find({})
    res.status(200).json({ subsections })
}

module.exports = {
    getAllSubsections
}