# MongoDB CRUD Operations using Ruby Driver

require 'mongo'
include Mongo

# Add the MongoDB Ruby driver to your Gemfile
# gem 'mongo'

# Install the MongoDB Ruby driver manually (if not using Bundler)
# gem install mongo

# Connection to MongoDB
connection_string = "mongodb://HOST:PORT/DATABASE_NAME" # Replace with your connection details
client = Mongo::Client.new(connection_string)
@collection = client[:books]

# ---- Creating Documents ----

# Inserting a single document
single_document = {
  isbn: '101',
  name: 'Mastering MongoDB 7.0',
  price: 30
}
result = @collection.insert_one(single_document)
puts "Inserted document ID: #{result.inserted_id}"

# Inserting multiple documents
multiple_documents = [
  { isbn: '102', name: 'MongoDB in 7 years', price: 50 },
  { isbn: '103', name: 'MongoDB for experts', price: 40 }
]
result = @collection.insert_many(multiple_documents)
puts "Inserted document IDs: #{result.inserted_ids}"

# Inserting a document with nested structure
nested_document = {
  isbn: '104',
  name: 'Python and MongoDB',
  meta: { version: 'MongoDB 7.0' },
  price: 60
}
@collection.insert_one(nested_document)

# ---- Reading Data ----

# Finding documents with specific criteria
@collection.find({ isbn: '101' }).each do |doc|
  puts doc.inspect
end

# Using dot notation to access nested fields
@collection.find({ 'meta.version' => 'MongoDB 7.0' }).each do |doc|
  puts doc.inspect
end

# Using logical AND and OR in queries
@collection.find({ '$or' => [{ isbn: '101' }, { isbn: '102' }] }).each do |doc|
  puts doc.inspect
end

# Example of using query options like sort, limit, and projection
@collection.find({}).sort(name: 1).limit(5).projection(price: 1).each do |doc|
  puts doc.inspect
end

# ---- Updating Data ----

# Updating a single document
@collection.update_one({ 'isbn' => '101' }, { '$set' => { 'name' => 'Mastering MongoDB 7.0 Updated' } })

# Updating multiple documents
@collection.update_many({ 'price' => { '$lt' => 50 } }, { '$set' => { 'status' => 'discounted' } })

# ---- Deleting Data ----

# Deleting a single document
@collection.find({ isbn: '103' }).delete_one

# Deleting multiple documents
@collection.find({ 'price' => { '$gte' => 30 } }).delete_many

# ---- Batch Operations using BulkWrite API ----

# Example of batch operations
batch_operations = [
  { insert_one: { document: { isbn: '105', name: 'New MongoDB Book', price: 45 } } },
  { update_one: { filter: { isbn: '101' }, update: { '$set' => { 'name' => 'Updated Title' } } } },
  { delete_one: { filter: { isbn: '102' } } }
]
bulk_write_result = @collection.bulk_write(batch_operations, ordered: true)
puts bulk_write_result.bulk_api_result

# Note: Replace HOST, PORT, and DATABASE_NAME with your actual MongoDB connection details.
