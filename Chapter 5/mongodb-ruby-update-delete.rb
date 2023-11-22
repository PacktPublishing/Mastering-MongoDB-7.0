# Updating and Deleting Data in MongoDB using Ruby

require 'mongo'
include Mongo

# Connect to the database
# Replace with your MongoDB connection details
connection_string = "mongodb://HOST:PORT/DATABASE_NAME"
client = Mongo::Client.new(connection_string)
@collection = client[:books]

# ---- Updating Data ----

# Updating a single document
# This updates the name of the book with ISBN '101'
@collection.update_one({ 'isbn' => '101' }, { '$set' => { 'name' => 'Mastering MongoDB 7.0' } })

# Updating multiple documents
# This can be used to update all documents that match a certain condition
@collection.update_many({ 'price' => { '$lt' => 50 } }, { '$set' => { 'discounted' => true } })

# ---- Deleting Data ----

# Deleting a single document
# This deletes the first document found with ISBN '101'
@collection.find({ 'isbn' => '101' }).delete_one

# Deleting multiple documents
# This deletes all documents with a price greater than or equal to 30
@collection.find({ 'price' => { '$gte' => 30 } }).delete_many

# Note: Replace the connection string with your actual MongoDB server details.
