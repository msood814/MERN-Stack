const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true)
const url = "mongodb://localhost:27017/SolarAllocation_DB";

const customerSchema = Schema({
    customerId: { type: Number, required: true },
    name: String,
    purchaseDate: { type: Date, default: new Date() },
    installationDate: { type: Date, default: new Date() },
    location: String
})

const allocationSchema = Schema({
    solarHeaterId: { type: Number, required: true, unique: true },
    distributorName: String,
    customer: { type: [customerSchema], default: [] }
},{collection : "Allocation"})

let collection = {};

collection.getAllocationData = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Allocation', allocationSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to database");
        err.status = 500;
        throw err;
    })
}

module.exports = collection; 