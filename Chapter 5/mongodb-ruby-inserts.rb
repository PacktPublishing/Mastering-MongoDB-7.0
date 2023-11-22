# MongoDB Connection and Document Creation using Ruby

# Add the MongoDB driver to your Gemfile
# gem "mongo"

# Install the MongoDB driver manually (if not using Bundler)
# gem install mongo

require 'mongo'
include Mongo

# Connect to the database
connection_string = "mongodb://HOST:PORT/DATABASE_NAME" # Replace with your connection details
client = Mongo::Client.new(connection_string)
db = client.database

# List collection names and metadata
puts db.collection_names
puts db.list_collections

# Assuming you have an instance variable for the 'books' collection
@collection = client[:books]

# Inserting a single document
document = {
  isbn: '101',
  name: 'Mastering MongoDB 7.0',
  price: 30
}
result = @collection.insert_one(document)
puts result.n

# Inserting multiple documents
documents = [
  { isbn: '102', name: 'MongoDB in 7 years', price: 50 },
  { isbn: '103', name: 'MongoDB for experts', price: 40 }
]
result = @collection.insert_many(documents)

# The result is a Mongo::BulkWrite::Result object
puts result.n
puts result.inserted_ids

# Note: Replace the connection_string with actual HOST, PORT, and DATABASE_NAME
