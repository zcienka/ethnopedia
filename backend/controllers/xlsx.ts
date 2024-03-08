import { Request, Response } from "express"
import excelJS from "exceljs"

const Subsection = require("../models/subsection")

const getXlsxWithAllData = async (req: Request, res: Response, next: any) => {
    try {
        let workbook = new excelJS.Workbook()
        const sheet = workbook.addWorksheet("test")
        sheet.addRows([[1,2,3,4,5],[6,7,8,9,10]])
        
        const fileName = "test.xlsx"
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

        await workbook.xlsx.write(res)
        
        res.end()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getXlsxWithAllData
}