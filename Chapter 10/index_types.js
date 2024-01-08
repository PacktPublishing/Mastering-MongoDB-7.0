// create unique index on title field

db.books.createIndex({
    "title": 1
}, {
    "unique": true
})

// create index on embedded field

db.books.createIndex({
    "meta.price": 1
})

// create index on entire subdocument

db.books.createIndex({
    "meta": 1
})

// create compound index

db.books.createIndex({
    "author": 1,
    "ISBN": 1
})

// supported combinations for previous compound index

db.books.find().sort({
    "author": 1,
    "ISBN": 1
})
db.books.find().sort({
    "author": -1,
    "ISBN": -1
})

// But the index will not be used for the following:

db.books.find().sort({
    "author": 1,
    "ISBN": -1
})
db.books.find().sort({
    "author": -1,
    "ISBN": 1
})