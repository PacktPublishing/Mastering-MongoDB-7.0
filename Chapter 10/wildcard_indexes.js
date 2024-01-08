// wildcard index

db.books.createIndex({
    "$**": 1
})


// sample document

// {
//     "_id": {
//         "$oid": "651726fe01c6f61ad8ee6460"
//     },
//     "i": 0,
//     "author": "Author_0",
//     "title": "Book title 0",
//     "ISBN": 74498,
//     "created": {
//         "$date": "2023-09-29T19:35:26.394Z"
//     },
//     "meta": {
//         "price": 56,
//         "rating": 0.16225525931335527
//     }
// }


// wildcard index

db.books.createIndex({
    "meta.$**": 1
})