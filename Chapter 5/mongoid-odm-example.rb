# Mongoid ODM Example in Ruby on Rails

# Add Mongoid to your Gemfile
# gem 'mongoid'

# In Rails' application.rb, configure Mongoid as the ORM
# config.generators do |g|
#   g.orm :mongoid
# end

require 'mongoid'

# Mongoid configuration (usually done in mongoid.yml)
# Remember to replace 'path_to_mongoid_config.yml' with the actual path to your Mongoid configuration file.
Mongoid.load!('path_to_mongoid_config.yml')

# Define a Book model
class Book
  include Mongoid::Document

  field :isbn, type: String
  field :name, type: String
  field :price, type: Float

  # Scoping query for books priced over $20
  scope :premium, -> { where(price: {'$gt' => 20}) }
end

# Enable QueryCache
Mongoid::QueryCache.enabled = true

# ---- CRUD Operations with Mongoid ----

# Create
Book.create(isbn: '202', name: 'Mastering MongoDB, 4th Edition', price: 25.0)

# Read
# Find a book by id
puts Book.find('592149c4aabac953a3a1e31e').inspect

# Find a book by name
puts Book.where(name: 'Mastering MongoDB').inspect

# Update
Book.where(isbn: '202').update(name: 'Mastering MongoDB, 4th Edition')
Book.where(price: { '$gt': 20 }).update_all(price_range:'premium')

# Delete
Book.where(isbn: '202').delete_all

# Using scope
premium_books = Book.premium
puts premium_books.inspect

# Note: This script is a simple demonstration and assumes a Rails environment.
