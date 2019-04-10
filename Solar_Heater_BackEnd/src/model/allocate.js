const dbModel = require('../utilities/connection');
let allocateModel = {}

allocateModel.generateId = () => {
    return dbModel.getAllocationData().then((model) => {
        return model.distinct("customer.customerId").then((ids) => {
            let sId = Math.max(...ids);
            return sId + 1;
        })
    })
}

allocateModel.allocateHeater = (distName, customerObj) => {
    return dbModel.getAllocationData().then((model) => {
        return allocateModel.generateId().then((id) => {
            customerObj.customerId = id;
            return model.updateOne({ distributorName: distName }, { $push: { customer: customerObj } })
                .then((data) => {
                    if (data.nModified > 0) {
                        return customerObj.customerId
                    }
                    else {
                        let err = new Error('Allocation Failed')
                        err.status = 500
                        throw err;
                    }
                })
        })
    })
}

allocateModel.fetchDetails = (location) => {
    return dbModel.getAllocationData().then((model) => {
        return model.find({ "customer.location": location }, { _id: 0, distributorName: 1 })
            .then((data) => {
                if (data && data.length > 0) {
                    return data;
                }
                else {
                    let err = new Error(`Service not provided in ${location}`);
                    err.status = 404
                    throw err;
                }
            })
    })
}

module.exports = allocateModel;