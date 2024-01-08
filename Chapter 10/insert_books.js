// generate 100.000 books and insert into collection

for (i = 0; i < 100000; i++) {
    db.books.insertOne({
        "i": i,
        "author": "Author_" + i,
        "title": "Book title " + i,
        "ISBN": Math.floor(Math.random() * 100000),
        "created": new Date(),
        "meta": {
            "price": Math.floor(Math.random() * 100),
            "rating": Math.random() * 5
        }
    })
}

// find book with specific title and explain the query

db.books
    .find({
        'title': 'Book title 45678'
    })
    .explain('executionStats')