// ESR (equality, sort, range) rule

// equality
db.cars.find({
    model: "Cordoba"
})


// sample query
db.cars.find({
    model: "Cordoba",
    color: "Black"
})

// sort phase
db.cars.find({
    manufacturer: "GM"
}).sort({
    model: 1
})

// indexing
db.cars.createIndex({
    manufacturer: 1,
    model: 1
})

// range phase
db.cars.find({
    manufacturer: "Ford",
    cost: {
        $gt: 15000
    }
}).sort({
    model: 1
})

// optimal index for a given query

// {
//     manufacturer: 1,
//     model: 1,
//     cost: 1
// }