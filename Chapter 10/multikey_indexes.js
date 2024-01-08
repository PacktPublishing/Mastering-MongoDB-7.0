// multikey index

db.books.insert({
    "title": "Book with tags",
    "author": "Jane Doe",
    "ISBN": 1111,
    "tags": ["MongoDB", "Mastering", "Packt Publishing"]
})

db.books.createIndex({
    "tags": 1
})

db.books.find({
    tags: "MongoDB"
}).explain("executionStats")

db.books.find({
    tags: ["mongodb", "index", "Packt"]
})