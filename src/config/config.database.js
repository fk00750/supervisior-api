const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: ".env" })

const projectName = process.env.PROJECTNAME || "test"

const MONGO_URI = process.env.MONGO_URI

const connectionOptions = {
    dbName: projectName
}

mongoose.connect(MONGO_URI,connectionOptions)

mongoose.connection.on("connected", () => {
    console.log("Database connected")
})

mongoose.connection.on('disconnected', () => {
    console.log('database disconnected')
})

mongoose.connection.on("error", (error) => {
    console.log(error.message)
})

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});