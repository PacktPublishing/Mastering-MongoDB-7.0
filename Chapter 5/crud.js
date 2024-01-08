// MongoDB CRUD (Create, Read, Update, Delete) Operations Example

// Switch to the desired database by replacing <db name> with the actual database name
use <db name> // Example: use myDatabase

// Create: Insert a new document into the 'books' collection
// This command adds a book with a title and an ISBN number to the collection
db.books.insertOne({ title: 'Mastering MongoDB 7.0', isbn: '101' });

// Read: Retrieve the document just inserted using its ISBN number
// This finds and displays the book with the ISBN '101'
db.books.find({ isbn: '101' });

// Update: Modify an existing document in the 'books' collection
// Here, the price field is added to the book with ISBN '101'
db.books.updateOne({ isbn: '101' }, { $set: { price: 30 } });

// Display the updated document to confirm the addition of the price field
// This retrieves and shows the updated book details, including the new price
db.books.find({ isbn: '101' });

// Delete: Remove the specified document from the 'books' collection
// This command deletes the book with ISBN '101' from the collection
db.books.deleteOne({ isbn: '101' });

// Confirm deletion: Check to ensure the document is removed
// After deletion, this query should return an empty result set
db.books.find({ isbn: '101' });

// Note: Ensure to replace <db name> with your actual database name before running the script
