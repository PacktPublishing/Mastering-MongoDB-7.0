// create an index on the title field

db.books.createIndex({ "title": 1 })

// query and explain

db.books
    .find({
        'title': 'Book title 45678'
    })
    .explain('executionStats')
