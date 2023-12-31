import { NextFunction, Request, Response } from "express"
import { ObjectId } from "mongodb"
import mongoose from "mongoose"
import {getMongoDBNativeDriverClient} from "../db/connect"
const mongoClient = getMongoDBNativeDriverClient()

const asyncWrapper = require("../middleware/async")

const Category = require("../models/category")

const getNestedKeys = (record: any, parents: any) => {
    let keys: any = []
    for (const property in record) {
        keys.push(`${parents}.${property}`)
        if(record[property]["subcategories"] !== undefined) {
            let subkeys = getNestedKeys(record[property]["subcategories"], `${parents}.${property}`)
            keys = keys.concat(subkeys)
        }           
    }
    return keys
}

export const getAllKeys = async (req: Request, res: Response, next: NextFunction) => {
    const records = await mongoClient.db().collection('artworks').find({Kategoria: req.query.collection}).toArray()
    let keys: any = []
    records.forEach(record => {
        for (const property in record) {
            if(property != "_id") {
                keys.push(property)
            }
            if(record[property]["subcategories"] !== undefined) {
                let subkeys = getNestedKeys(record[property]["subcategories"], property)
                keys = keys.concat(subkeys)
            }            
        }
    });
    let keys_unique = keys.filter((value: any, index: number, array: any) => {
        return array.indexOf(value) === index;
      })
    res.status(200).json(keys_unique)
}

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
    getAllCategories,
    getAllKeys
}