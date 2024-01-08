// TTL indexes

db.books.createIndex({
    "created": 1
}, {
    expireAfterSeconds: 86400
})