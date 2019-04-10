class Customer {
    constructor(obj) {
        this.customerId = obj.customerId;
        this.customerName = obj.customerName;
        this.customerLocation = obj.customerLocation;
        this.purchaseDate = obj.purchaseDate;
        this.installationDate = obj.installationDate;
    }
}


module.exports = Customer