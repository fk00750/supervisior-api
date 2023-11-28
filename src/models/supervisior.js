const mongoose = require('mongoose')

const supervisiorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    mobile: { type: Number, required: true, unique: true },
    role: { type: Number, default: 1 },
    aadharNumber: { type: Number, required: true, unique: true },
    assignedArea: { type: String, default: "" },
    password: { type: String, required: true },
    is_profile_verified: { type: Boolean, default: false },
    is_email_verified: { type: Boolean, default: false },
    is_mobile_verified: { type: Boolean, default: false },
    is_aadhar_verified: { type: Boolean, default: false }
}, { timestamps: true })

const Supervisior = mongoose.model("supervisior", supervisiorSchema)

module.exports = Supervisior