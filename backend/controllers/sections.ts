import { Request, Response } from "express"

const Section = require("../models/section")

const getAllSections = async (req: Request, res: Response, next: any) => {
    const sections = await Section.find({})
    res.status(200).json({ sections })
}

const getSectionsByCollectionName = async (req: Request, res: Response, next: any) => {
    const collectionName = decodeURIComponent(req.params.collectionName)

    try {
        const sections = await Section.find({ collectionName: collectionName }).exec()

        if (!sections) {
            return res.status(404).json("Section not found")
        } else {
            return res.status(200).json(sections)
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllSections,
    getSectionsByCollectionName,
}