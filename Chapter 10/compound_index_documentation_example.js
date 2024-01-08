// MongoDB documentation example


// create students

db.students.insertMany(
    [{
        "name": "Alice",
        "gpa": 3.6,
        "location": {
            city: "Sacramento",
            state: "California"
        }
    },
    {
        "name": "Bob",
        "gpa": 3.2,
        "location": {
            city: "Albany",
            state: "New York"
        }
    }
    ]
)


// create compound index

db.students.createIndex({
    name: 1,
    gpa: -1
})

// supported queries

db.students.find({
    name: "Alice",
    gpa: 3.6
})

db.students.find({
    name: "Bob"
})