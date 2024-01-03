import express, { Request, Response, NextFunction } from "express"
require("dotenv").config()

const app = express()
const cors = require("cors")


const auth = require("./routes/auth")
const artworks = require("./routes/artwork")
const collections = require("./routes/collection")
const sections = require("./routes/section")
const subsections = require("./routes/subsection")
const categories = require("./routes/category")
const general = require("./routes/general")
const upload = require("./routes/upload")

const {connectDB, connectMongoDBNativeDriver} = require("./db/connect")

app.use(cors())
app.use(express.json())

app.use("/api/v1/auth", auth)
app.use("/api/v1/artworks", artworks)
app.use("/api/v1/collection", collections)
app.use("/api/v1/sections", sections)
app.use("/api/v1/subsections", subsections)
app.use("/api/v1/categories", categories)
app.use("/api/v1", general)
app.use("/api/v1/upload", upload)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await connectMongoDBNativeDriver()
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`),
        )
    } catch (error) {
        console.log(error)
    }
}

start()
