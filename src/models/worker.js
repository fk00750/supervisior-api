const mongoose = require('mongoose')

const workerSchema = new mongoose.Schema({
    workerId: {
        type: String,
        required: true,
        unqiue: true
    },
    supervisiorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    aadharNumber: {
        type: Number,
        default: "",
        unique: true
    },
    workType: {
        type: String,
        default: "hourly"
    },
    location: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    wage: {
        type: Number,
        required: true
    },
    is_mobile_verified: { type: Boolean, default: false },
    is_aadhar_verified: { type: Boolean, default: false }
}, { timestamps: true })

const Worker = mongoose.model("worker", workerSchema)

module.exports = Worker 