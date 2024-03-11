import { Request, Response } from "express"
import excelJS from "exceljs"
import {getMongoDBNativeDriverClient} from "../db/connect"
const mongoClient = getMongoDBNativeDriverClient()

const Subsection = require("../models/subsection")


const getXlsxWithAllData = async (req: Request, res: Response, next: any) => {
    try {
        const collectionName = decodeURIComponent(req.params.collectionName)
        const keysToInclude: any = req.query.keysToInclude
        let workbook = new excelJS.Workbook()
        const sheet = workbook.addWorksheet("test")

        const records = await mongoClient.db().collection('artworks').find({collectionName: collectionName}).toArray()
        
        let columnNames: Array<any> = []
        if(Array.isArray(keysToInclude)) {
            keysToInclude.forEach((key: any) => {
                columnNames.push({header: key, key: key})
            })
        } else {
            console.log("WRONG")
            console.log(keysToInclude)
            Object.keys(keysToInclude).forEach((k: any) => {
                columnNames.push({header: keysToInclude[k], key: keysToInclude[k]})
            })
        }
        
        sheet.columns = columnNames

        records.forEach((record: any) => {
            sheet.addRow(record)
        })
        
        //cell formatting
        sheet.columns.forEach(function (column, i) {
            let maxLength = 0;
            column["eachCell"]!({ includeEmpty: true }, function (cell) {
                var columnLength = cell.value ? cell.value.toString().length : 10;
                if (columnLength > maxLength ) {
                    maxLength = columnLength;
                }
            });
            column.width = maxLength < 10 ? 10 : maxLength;
        });

        const fileName = "test.xlsx"
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

        await workbook.xlsx.write(res)
        
        res.end()
    } catch (error) {
        next(error)
    }
}

const getAllCaterories = async (req: Request, res: Response, next: any) => {
    try {
        const collectionName = decodeURIComponent(req.params.collectionName)

        const records = await mongoClient.db().collection('artworks').find({collectionName: collectionName}).toArray()
        
        // find keys
        let keys: any = []
        records.forEach((record: any) => {
            for (const property in record) {
                if (property != "_id") {
                    keys.push(property)
                }
            }
        })
        let keysUnique = keys.filter((value: any, index: number, array: any) => {
            return array.indexOf(value) === index
        })
        // console.log(keysUnique)
        return res.status(200).json({ keysUnique })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getXlsxWithAllData,
    getAllCaterories
}