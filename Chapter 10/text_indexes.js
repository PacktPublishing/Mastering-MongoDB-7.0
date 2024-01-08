// text iundexes

db.books.createIndex({
    "author": "text"
})

db.articles.createIndex({
    "title": "text",
    "teaser": "text",
    "body": "text"
}, {
    weights: {
        title: 10,
        teaser: 8,
        body: 1
    },
    name: "TextIndex"
})