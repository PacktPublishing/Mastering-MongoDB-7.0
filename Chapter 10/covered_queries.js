// index that covers the inventory collection

db.inventory.createIndex({
    type: 1,
    item: 1
})

// covered query

db.inventory.find({
    type: "food",
    item: "bread"
}, {
    item: 1,
    _id: 0
})



// {
//     id: 1,
//     user: {
//         login: "tester"
//     }
// }


// {
//     "user.login": 1
// }

db.userdata.find({
    "user.login": "tester"
}, {
    "user.login": 1,
    _id: 0
})