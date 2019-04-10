const express = require('express');
const routing = express.Router();
const allocateService = require('../service/allocate')
const Customer = require('../model/customer')

routing.get('/evaluate', (req, res, next) => {
    console.log("Request came!!");
    allocateService.evaluate()
        .then((data) => {
            console.log("Completed success!!");
            res.send(data)
        }).catch((err) => {
            console.log("Completed err!!");
            next(err)
        })
})

routing.put('/allocate/:distributor', (req, res, next) => {
    let assign = new Customer(req.body);
    allocateService.allocate(req.params.distributor, assign).then((custId) => {
        res.json({ "message": "Solar Heater " + req.params.distributor + " successfully allocated to customer " + custId })
    }).catch(function (err) {
        next(err);
    })
})

routing.get('/findService/:location', (req, res, next) => {
    allocateService.fetchDetails(req.params.location).then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err);
    })
})




module.exports = routing;