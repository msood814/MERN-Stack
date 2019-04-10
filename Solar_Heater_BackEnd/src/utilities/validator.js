let Validator = {}

Validator.validateCustomer = (name) => {

    if (!name.match(/^[A-z][A-z\s]{3,}$/)) {
        let err = new Error("Customer name cannot have special characters");
        err.status = 406
        throw err
    }
    else if (name.length < 4) {
        let err = new Error("Customer name should be of min 4 character length");
        err.status = 406
        throw err
    }
}

Validator.validateDate = (pDate, iDate) => {
    if (new Date(pDate) < new Date()) {
        let err = new Error("Purchase date should be greater than or equal to today");
        err.status = 406
        throw err
    }
    if (new Date(iDate) <= new Date(pDate)) {
        let err = new Error("Installation Date should be greater than Purchase Date");
        err.status = 406
        throw err
    }
}

Validator.validateDistributor = (distributor) => {
    var distArr = ["Suntek", "A4solar", "SupremeSolar", "IcarusHeaters", "MagnumTurbo", "Blitz"]
    if (distArr.indexOf(distributor) == -1) {
        let err = new Error("Invalid Distributor Name")
        err.status = 406
        throw err
    }
}

module.exports = Validator;