# CRUD Operations Using PyMongo in Python

from pymongo import MongoClient
from pprint import pprint

# MongoDB Connection
connection_string = "mongodb://HOST:PORT/DATABASE_NAME"  # Replace with your connection details
client = MongoClient(connection_string)
books = client.mongodb_books.books

# ---- Inserting Documents ----

# Insert a single document
book = {
    'isbn': '301',
    'name': 'Python and MongoDB',
    'meta': {'version': 'MongoDB 7.0'},
    'price': 60
}
insert_result = books.insert_one(book)
print("Inserted Document ID:", insert_result.inserted_id)

# Insert multiple documents
documents = [
    {'isbn': '302', 'name': 'Python and MongoDB', 'meta': {'version': 'MongoDB 7.0'}, 'price': 60},
    {'isbn': '303', 'name': 'Advanced MongoDB Techniques', 'price': 70}
]
insert_many_result = books.insert_many(documents)
print("Inserted Document IDs:", insert_many_result.inserted_ids)

# ---- Finding Documents ----

# Find a single document
print("Finding a document with ISBN 301:")
pprint(books.find_one({"isbn": "301"}))

# Find documents with specific criteria
for doc in books.find({"name": "Python and MongoDB"}):
    pprint(doc)

# Find using regular expression in nested documents
for doc in books.find({'meta.version': {"$regex": ".*?g.*?7\.0$", "$options": "i"}}):
    pprint(doc)

# Find using comparison operators
for doc in books.find({'price': {"$gt": 50}}):
    pprint(doc)

# Find using logical AND
for doc in books.find({"name": "Advanced MongoDB Techniques", "price": 70}):
    pprint(doc)

# Find using logical OR
for doc in books.find({"$or": [{"name": "Advanced MongoDB Techniques"}, {"isbn": "301"}]}):
    pprint(doc)

# ---- Updating Documents ----

# Update a single document
update_result = books.update_one({"name": "Advanced MongoDB Techniques"}, {"$set": {"price": 75}})
print("Updated", update_result.modified_count, "document(s)")

# Fetch and print the updated document
updated_document = books.find_one({"name": "Advanced MongoDB Techniques"})
pprint(updated_document)

# ---- Deleting Documents ----

# Delete a single document
delete_result = books.delete_one({"isbn": "303"})
print("Deleted", delete_result.deleted_count, "document(s)")

# Note: Replace HOST, PORT, and DATABASE_NAME with your actual MongoDB connection details.
