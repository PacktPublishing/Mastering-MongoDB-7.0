// Advanced Scripting in MongoDB Shell (mongosh)

// Declaring a JavaScript variable in the shell
let title = 'MongoDB in a nutshell';

// Printing the value of the variable to the shell output
print(title); // Outputs: MongoDB in a nutshell

// Inserting a document into the 'books' collection using the declared variable
db.books.insertOne({ title: title, isbn: 102 });

// Finding the inserted document in the 'books' collection
// This queries the collection for the book with the specified title and ISBN
db.books.find({ title: title, isbn: 102 });

// Defining a JavaScript function in the mongosh shell for querying books by ISBN
// This function takes an ISBN number as an argument and returns matching books
queryBooksByIsbn = function(isbn) {
  return db.books.find({ isbn: isbn });
};

// Using the defined function to query books by ISBN
// This example fetches books with ISBN 102
queryBooksByIsbn(102);

// Note: This script is meant to be run in the MongoDB shell, which supports JavaScript
