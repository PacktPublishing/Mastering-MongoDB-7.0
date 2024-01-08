// drop index

db.books.dropIndex({ "title": 1 })

// to drop an index by name:
db.books.dropIndex("title_1")
