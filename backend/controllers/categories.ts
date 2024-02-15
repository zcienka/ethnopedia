import { NextFunction, Request, Response } from "express"
import { ObjectId } from "mongodb"
import mongoose from "mongoose"
import {getMongoDBNativeDriverClient} from "../db/connect"
const mongoClient = getMongoDBNativeDriverClient()

const asyncWrapper = require("../middleware/async")

const Artwork = require("../models/artwork")
const Category = require("../models/category")

const getNestedKeys = (record: any, parents: any) => {
    let keys: any = []

    for (const property in record) {
        keys.push(`${parents}.${property}`)
        if (record[property]["subcategories"] !== undefined) {
            let subkeys = getNestedKeys(record[property]["subcategories"], `${parents}.${property}`)
            keys = keys.concat(subkeys)
        }
    }
    return keys
}

export const getAllKeys = async (req: Request, res: Response, next: NextFunction) => {
    const records = await Artwork.find({ Collection: { value: req.query.collection } }).toArray()
    let keys: any = []

    records.forEach((record: any) => {
        for (const property in record) {
            if (property != "_id") {
                keys.push(property)
            }
            if (record[property]["subcategories"] !== undefined) {
                let subkeys = getNestedKeys(record[property]["subcategories"], property)
                keys = keys.concat(subkeys)
            }
        }
    })

    let keysUnique = keys.filter((value: any, index: number, array: any) => {
        return array.indexOf(value) === index
    })

    res.status(200).json(keysUnique)
}

const getCategoriesById = async (req: Request, res: Response, next: NextFunction) => {
    const page = typeof req.query.page === "string" ? parseInt(req.query.page) : 1
    const limit = typeof req.query.limit === "string" ? parseInt(req.query.limit) : 5

    const skip = (page - 1) * limit

    // const total = await Category.countDocuments()
    // const totalPages = Math.ceil(total / limit)

    // const categories = await Category.find({}).skip(skip).limit(limit)
    //eq.query.id
    try {
        const id = req.params.id

        const categories = await Category.find({ collectionId: id })

        res.status(200).json(categories)
    } catch (error) {
        console.error("Error finding categories:", error)
        res.status(500).json({ message: "Error fetching categories." })
    }
}

module.exports = {
    getCategoriesById,
    getAllKeys,
}