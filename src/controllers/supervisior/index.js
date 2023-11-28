const CustomErrorHandler = require("../../utils/custom.error.handler")
const { randomUUID } = require('crypto');
const { WorkerManager } = require("../../utils/helper_functions");
const Worker = require("../../models/worker");
const workerManager = new WorkerManager()
const ObjectId = require('mongoose').Types.ObjectId

const supervisiorProfile = async (req, res, next) => {
    try {
        const { name, email, mobile, aadharNumber } = req.user

        res.status(200).json({
            name, email, mobile,aadharNumber
        })
    } catch (error) {
        console.log(`Error: src > controllers > supervisior > index.js > supervisiorProfile : ${error.message}`)
        next(error)
    }
}

const registerWorker = async (req, res, next) => {
    try {
        const { _id } = req.user;

        const { name, mobile, age, workType, location, specialty, experience, wage } = req.body

        const missingField = !name ? "Please Provide Name" : !mobile ? "Please Provide Mobile" : !age ? "Please Provide Age" :
            !location ? "Please Provide Location" :
                !specialty ? "Please Mention Specialty" :
                    !experience ? "Please Mention experience" : !wage ? "Please Provide Wage" : null

        if (missingField) return next(CustomErrorHandler.somethingWentWrong(missingField));

        const workerId = randomUUID()
        const supervisiorId = new ObjectId(_id)

        const isWorkerCreated = await workerManager.createWorker(workerId, supervisiorId, name, mobile, age, workType, location, specialty, experience, wage)

        if (!isWorkerCreated) return next(CustomErrorHandler.somethingWentWrong());

        return res.status(200).json({
            message: "success",
        });
    } catch (error) {
        console.log(`Error: src > controllers > supervisior > index.js > createWorker : ${error.message}`)
        next(error)
    }
}

const getWorkers = async (req, res, next) => {
    try {
        const { _id } = req.user;

        const workers = await Worker.find({ supervisiorId: new ObjectId(_id) })

        if (!workers) return next(CustomErrorHandler.notFound("Workers Not Found"))

        res.status(200).json({
            workers
        })
    } catch (error) {
        console.log(`Error: src > controllers > supervisior > index.js > getWorkers : ${error.message}`)
        next(error)
    }
}

const getWorker = async (req, res, next) => {
    try {
        const { workerId } = req.params

        if (!workerId) return next(CustomErrorHandler.somethingWentWrong("Worker Id Not Found"))

        const worker = await Worker.findOne({ workerId })

        if (!worker) return next(CustomErrorHandler.notFound("Worker Not Found"))

        res.status(200).json({
            worker
        })
    } catch (error) {
        console.log(`Error: src > controllers > supervisior > index.js > getWorker : ${error.message}`)
        next(error)
    }
}

module.exports = { supervisiorProfile, registerWorker, getWorkers, getWorker }