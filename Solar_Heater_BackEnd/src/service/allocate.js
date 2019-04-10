let allocateModel = require('../model/allocate')
let validator = require('../utilities/validator');
const exec = require('child-process-promise').exec;
const fs = require('fs');
const path = require("path")
const parser = require("./parser");

let allocateService = {}

allocateService.evaluate = () => {
    evaluationPath = path.join(__dirname, "../../../Solar_Heater");
    console.log("Begin testing!!");
    return exec(`cd ${evaluationPath} && npm test`)
        .then((response) => {
            let content = fs.readFileSync("../../Solar_Heater/testReport.json", 'utf8');
            return parser.generateTestReport(content);
        }).catch((err) => {
            let content = fs.readFileSync("../../Solar_Heater/testReport.json", 'utf8');
            return parser.generateTestReport(content);
        })
}


allocateService.allocate = (distName, customerObj) => {
    console.log(customerObj)
    validator.validateCustomer(customerObj.customerName)
    validator.validateDate(customerObj.purchaseDate, customerObj.installationDate)
    validator.validateDistributor(distName)
    return allocateModel.allocateHeater(distName, customerObj).then((custId) => {
        return custId;
    })
}

allocateService.fetchDetails = (location) => {
    return allocateModel.fetchDetails(location).then((data) => {
        let dataArr = []
        data.forEach(_ => {
            dataArr.push(_.distributorName)
        })
        return dataArr;
    })
}

module.exports = allocateService;