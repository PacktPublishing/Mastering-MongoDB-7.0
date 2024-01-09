// compound wildcard index

// sample document

// {
//     "seller_id": "123",
//     "name": "Ring",
//     "attributes": {
//         "color": "blue",
//         "size": "S",
//         "material": "silver",
//     },
//     "stock": 2
// }


// create compound wildcard index

db.products.createIndex({
    seller_id: 1,
    "attributes.$**": 1,
    name: 1,
    stock: 1
})

