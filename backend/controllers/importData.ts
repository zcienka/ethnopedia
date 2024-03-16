import { NextFunction, Request, Response } from "express"
import { getMongoDBNativeDriverClient } from "../db/connect"
const mongoClient = getMongoDBNativeDriverClient()

const importData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.body[0]
        const records: Array<[]> = []
        for (const key in req.body) {
            if (req.body.hasOwnProperty(key) && key != "0") {
                const recordData = req.body[key];
                const record: any = {}
                for (const recordDataKey in recordData) {
                    const value = recordData[recordDataKey]
                    record[header[recordDataKey]] = value
                }
                records.push(record)
            }
        }
        mongoClient.db().collection('artworks').insertMany(records)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    importData,
}
