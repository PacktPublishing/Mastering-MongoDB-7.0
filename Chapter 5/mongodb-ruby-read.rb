# Comprehensive MongoDB Operations with Nested Documents using Ruby

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

# Finding documents with multiple criteria
@collection.find({ isbn: '101', name: 'Mastering MongoDB 7.0' }).each do |doc|
  puts doc.inspect
end

# Inserting multiple documents
multiple_documents = [
  { isbn: '102', name: 'MongoDB in 7 years', price: 50 },
  { isbn: '103', name: 'MongoDB for experts', price: 40 }
]
@collection.insert_many(multiple_documents)

# Query options example
@collection.find({ isbn: '101' })
           .projection(price: 1)
           .sort(name: -1)
           .limit(5)
           .skip(2)
           .batch_size(10)
           .each { |doc| puts doc.inspect }

# Document count example
puts "Total count: #{@collection.count_documents({ isbn: '101' })}"
puts "Estimated count: #{@collection.estimated_document_count}"

# Handling nested documents
nested_document = {
  isbn: '104',
  name: 'Python and MongoDB',
  meta: { version: 'MongoDB 7.0' },
  price: 60
}
@collection.insert_one(nested_document)

# Retrieving nested document data
@collection.find({ 'meta.version' => 'MongoDB 7.0' }).each do |doc|
  puts doc.inspect
end

# Note: Replace the connection string with your actual MongoDB server details.
