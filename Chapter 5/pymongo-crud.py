# CRUD Operations Using PyMongo in Python

from pymongo import MongoClient
from pprint import pprint

# Install PyMongo using pip:
# python -m pip install pymongo

# MongoDB Connection
uri = "<connection_string>"  # Replace with your connection string
client = MongoClient(uri)
books = client.mongodb_books.books

# ---- Inserting Documents ----
# Insert a new book document
book = {
    'isbn': '301',
    'name': 'Python and MongoDB',
    'meta': {'version': 'MongoDB 7.0'},
    'price': 60
}
insert_result = books.insert_one(book)
pprint(insert_result.inserted_id)

# ---- Finding Documents ----
# Fetch documents with the name "Python and MongoDB"
for document in books.find({"name": "Python and MongoDB"}):
    pprint(document)

# Using dot notation for nested fields
for document in books.find({'meta.version': {"$regex": ".*?g.*?7\.0$", "$options": "i"}}):
    pprint(document)

# Using comparison operators
for document in books.find({'price': {"$gt": 50}}):
    pprint(document)

# Logical AND query
for document in books.find({"name": "Advanced MongoDB Techniques", "price": 70}):
    pprint(document)

# Logical OR query
for document in books.find({"$or": [{'name': 'Advanced MongoDB Techniques'}, {'isbn': '301'}]}):
    pprint(document)

# ---- Updating Documents ----
# Update a single document
books.update_one({"name": "Advanced MongoDB Techniques"}, {"$set": {"price": 75}})

# Fetch and print the updated document
updated_document = books.find_one({"name": "Advanced MongoDB Techniques"})
pprint(updated_document)

# ---- Deleting Documents ----
# Delete a single document
isbn_to_delete = '303'
delete_result = books.delete_one({"isbn": isbn_to_delete})
pprint(delete_result.deleted_count)

# Note: Replace <connection_string> with your actual MongoDB connection string.
