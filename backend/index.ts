import express from "express"
import asyncWrapper from "./middleware/async"

const app = express()
const cors = require("cors")

const artworks = require("./routes/artwork")
const auth = require("./routes/auth")

const connectDB = require("./db/connect")

require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use(asyncWrapper)

app.use("/api/v1/artwork", artworks)
app.use("/api/v1/auth", auth)

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
