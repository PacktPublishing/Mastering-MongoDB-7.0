# MongoDB Documents Creations with BulkWrite API using Ruby

require 'mongo'
include Mongo

# Connect to the database
# Replace 'mongodb://HOST:PORT/DATABASE_NAME' with your actual connection string
connection_string = "mongodb://HOST:PORT/DATABASE_NAME"
client = Mongo::Client.new(connection_string)
@collection = client[:books]

# Inserting a single document
single_document = {
  isbn: '101',
  name: 'Mastering MongoDB 7.0',
  price: 30
}
@collection.insert_one(single_document)

# Inserting multiple documents using insert_many
multiple_documents = [
  { isbn: '102', name: 'MongoDB in 7 years', price: 50 },
  { isbn: '103', name: 'MongoDB for experts', price: 40 }
]
result = @collection.insert_many(multiple_documents)

# Batch Operations using BulkWrite API
# Preparing a batch of insert operations
documents_for_bulk_write = [
  { insert_one: { document: { isbn: '104', name: 'MongoDB Essentials', price: 35 } } },
  { insert_one: { document: { isbn: '105', name: 'The MongoDB Journey', price: 45 } } }
]

# Performing bulk write operations
bulk_write_result = @collection.bulk_write(documents_for_bulk_write, ordered: true)

# Outputting the results of the bulk write operation
puts "Number of documents inserted by bulk write: #{bulk_write_result.inserted_count}"

# Note: Replace the connection string with your actual MongoDB server details.
