const collection = require('../utilities/connection');

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

const allocateDb = [
    {
        solarHeaterId: 2001,
        distributorName: 'Suntek',
        customer: [
            {
                customerId: 1002,
                name: 'Jatin',
                purchaseDate: new Date(year, month, day),
                installationDate: new Date(year, month, day + 3),
                location: 'Mysore'
            },
            {
                customerId: 1001,
                name: 'Dolly',
                purchaseDate: new Date(year, month + 2, day),
                installationDate: new Date(year, month + 2, day + 3),
                location: 'Mysore'
            }
        ]
    },
    {
        solarHeaterId: 2002,
        distributorName: 'A4solar',
        customer: [
            {
                customerId: 1003,
                name: 'Unlond',
                purchaseDate: new Date(year, month + 3, day),
                installationDate: new Date(year, month + 3, day + 7),
                location: 'Chennai'
            }
        ]
    },
    {
        solarHeaterId: 2003,
        distributorName: 'SupremeSolar',
        customer: [
            {
                customerId: 1005,
                name: 'Allegi',
                purchaseDate: new Date(year, month - 1, day),
                installationDate: new Date(year, month - 1, day + 3),
                location: 'Bangalore'
            }
        ]
    },
    {
        solarHeaterId: 2004,
        distributorName: 'Blitz',
        customer: [
            {
                customerId: 1006,
                name: 'Alez',
                purchaseDate: new Date(year, month - 2, day),
                installationDate: new Date(year, month - 1, day + 1),
                location: 'Bangalore'
            },
            {
                customerId: 1007,
                name: 'Farib',
                purchaseDate: new Date(year, month - 1, day),
                installationDate: new Date(year, month, day - 1),
                location: 'Chennai'
            }
        ]
    },
    {
        solarHeaterId: 2005,
        distributorName: 'IcarusHeaters',
        customer: []
    },
    {
        solarHeaterId: 2006,
        distributorName: "MagnumTurbo",
        customer: [
            {
                customerId: 1008,
                name: 'Dave',
                purchaseDate: new Date(year, month - 2, day - 3),
                installationDate: new Date(year, month - 2, day - 1),
                location: 'Pune'
            }
        ]
    }
]

exports.setupDb = () => {
    return collection.getAllocationData().then((inventory) => {
        return inventory.deleteMany().then(() => {
            return inventory.insertMany(allocateDb).then((data) => {

                if (data) {
                    return "Insertion Successfull"
                } else {
                    throw new Error("Insertion failed")
                }
            })
        })
    })
}