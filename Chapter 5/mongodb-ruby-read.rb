# Reading Data from MongoDB using the Ruby Driver

require 'mongo'
include Mongo

# Connect to the database (Replace with your connection string)
connection_string = "mongodb://HOST:PORT/DATABASE_NAME"
client = Mongo::Client.new(connection_string)
@collection = client[:books]

# Basic find operation using a single criterion
result = @collection.find({ isbn: '101' })
result.each { |doc| puts doc.inspect }

# Find operation using multiple criteria (AND operation)
result = @collection.find({ isbn: '101', name: 'Mastering MongoDB 7.0' })
result.each { |doc| puts doc.inspect }

# Using various query options
result = @collection.find({ isbn: '101' })
                   .projection(price: 1)
                   .sort(name: -1)
                   .limit(5)
                   .skip(2)
                   .batch_size(10)
result.each { |doc| puts doc.inspect }

# Using .count_documents and .estimated_document_count
total_count = @collection.count_documents({ isbn: '101' })
puts "Total count: #{total_count}"

estimated_count = @collection.estimated_document_count
puts "Estimated count: #{estimated_count}"

# Using .distinct
distinct_prices = @collection.distinct(:price)
puts "Distinct prices: #{distinct_prices.inspect}"

# Chaining operations with OR operator
result = @collection.find('$or' => [{ isbn: '101' }, { isbn: '102' }])
result.each { |doc| puts doc.inspect }

# Note: Replace HOST, PORT, and DATABASE_NAME with your actual MongoDB connection details
