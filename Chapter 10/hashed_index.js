// hashed index

db.books.createIndex({
    "title": "hashed"
})

db.books.createIndex({
    "created": "hashed",
    "title": 1,
    "author": -1
})