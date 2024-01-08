// partial index

db.books.createIndex({
    "meta.price": 1,
    "title": 1
}, {
    partialFilterExpression: {
        "meta.price": {
            $gt: 50
        }
    }
})