// hidden index


// create hidden index

db.books.createIndex({
    "title": 1
}, {
    hidden: true,
    name: "hidden_name_index"
})


// unhide hidden index

db.books.unhideIndex("hidden_name_index")