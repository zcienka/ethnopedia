import { Request, Response } from "express"

const Subsection = require("../models/subsection")

const getXlsxWithAllData = async (req: Request, res: Response, next: any) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getXlsxWithAllData
}