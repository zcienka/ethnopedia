import express from "express"
import asyncWrapper from "./middleware/async"

const app = express()
const cors = require("cors")


const auth = require("./routes/auth")
const artworks = require("./routes/artwork")
const collections = require("./routes/collection")
const sections = require("./routes/section")
const subsections = require("./routes/subsection")
const categories = require("./routes/category")


const connectDB = require("./db/connect")

require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use(asyncWrapper)

app.use("/api/v1/auth", auth)
app.use("/api/v1/artwork", artworks)
app.use("/api/v1/collection", collections)
app.use("/api/v1/sections", sections)
app.use("/api/v1/subsections", subsections)
app.use("/api/v1/categories", categories)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`),
        )
    } catch (error) {
        console.log(error)
    }
}

start()
