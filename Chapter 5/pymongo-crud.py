# CRUD Operations Using PyMongo in Python

# Install PyMongo using pip:
# python -m pip install pymongo

from pymongo import MongoClient
from bson.objectid import ObjectId

# Replace the placeholder with your MongoDB connection string
uri = "<connection_string>"
client = MongoClient(uri)

# Connect to the database and collection
db = client['mydatabase']
collection = db['books']

# ---- Create ----

# Inserting a single document
single_document = {
    'isbn': '101',
    'title': 'Mastering PyMongo',
    'price': 30
}
result = collection.insert_one(single_document)
print(f"Inserted document with ID: {result.inserted_id}")

# Inserting multiple documents
documents = [
    {'isbn': '102', 'title': 'Python and MongoDB', 'price': 50},
    {'isbn': '103', 'title': 'Advanced Python', 'price': 40}
]
result = collection.insert_many(documents)
print(f"Inserted document IDs: {result.inserted_ids}")

# ---- Read ----

# Finding documents
for book in collection.find({'isbn': '101'}):
    print(book)

# ---- Update ----

# Updating a single document
collection.update_one({'isbn': '101'}, {'$set': {'title': 'Updated Title'}})

# Updating multiple documents
collection.update_many({'price': {'$gt': 35}}, {'$set': {'status': 'premium'}})

# ---- Delete ----

# Deleting a single document
collection.delete_one({'isbn': '103'})

# Deleting multiple documents
collection.delete_many({'price': {'$lte': 40}})

# Note: Replace <connection_string> with your actual MongoDB connection string.
