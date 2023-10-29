import express from "express"

const app = express()
const tracks = require("./routes/track")
const connectDB = require("./db/connect")

require("dotenv").config()

app.use(express.json())
app.use("/api/v1/track", tracks)

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
