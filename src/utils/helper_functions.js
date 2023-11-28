const Supervisior = require("../models/supervisior");
const crypto = require('crypto');
const Worker = require("../models/worker");

class SupervisiorManager {
    async findSupervisior(criteria) {
        if (!criteria) return false;

        const supervisior = await Supervisior.findOne(criteria);

        if (!supervisior) return false;

        return supervisior;
    }

    async findUserByEmail(email) {
        return this.findSupervisior({ email });
    }

    async findUserByMobile(mobile) {
        return this.findSupervisior({ mobile });
    }

    hashedPassword(password) {
        const salt = crypto.randomBytes(16).toString('hex')

        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')

        const storedPassword = `${salt}:${hashedPassword}`

        return storedPassword
    }

    verifyPassword(enteredPassword, storedPassword) {
        const [salt, storedHash] = storedPassword.split(":")

        const enteredHash = crypto.pbkdf2Sync(enteredPassword, salt, 10000, 64, 'sha256').toString('hex')

        return enteredHash === storedHash
    }

    async createSupervisior(name, email, mobile, aadharNumber, password) {
        try {
            const hashedPassword = this.hashedPassword(password);

            if (!hashedPassword) throw error;

            const supervisior = await Supervisior.create({
                name, email, mobile, aadharNumber, password: hashedPassword
            })

            if (!supervisior) throw error;

            return supervisior;
        } catch (error) {
            console.log(`utils > helper_functions > userManager > createUser: ${error.message}`);
            return false;
        }
    }
}

class WorkerManager {
    async createWorker(workerId, supervisiorId, name, mobile, age, workType, location, specialty, experience, wage) {
        try {
            const worker = await Worker.create({ workerId, supervisiorId, name, mobile, age, workType, age, location, specialty, experience, wage })

            if (!worker) return

            return worker
        } catch (error) {
            console.log(`src > utils > helper_functions > WorkerManager > createWorker : ${error.message}`)
            return false
        }
    }
}


module.exports = { SupervisiorManager, WorkerManager }