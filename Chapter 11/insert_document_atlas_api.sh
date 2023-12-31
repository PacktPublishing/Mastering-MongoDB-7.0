#!/bin/bash
# Script to insert a document using the MongoDB Atlas Data API

# Replace <Your-Atlas-API-Key> with your actual MongoDB Atlas API key.
# Replace <App-ID> with the App ID of your MongoDB Atlas application. 

curl -s "https://data.mongodb-api.com/app/<App-ID>/endpoint/data/v1/action/insertOne" \
  -X POST \
  -H "Content-Type: application/ejson" \
  -H "Accept: application/json" \
  -H "apiKey: <Your-Atlas-API-Key>" \
  -d '{
        "dataSource": "mongodb-atlas",
        "database": "learn-data-api",
        "collection": "hello",
        "document": {
          "text": "Hello, world!"
        }
     }'

# Modify the data source, database, and collection names to reflect your Atlas setup.
# The document field should contain the data you want to insert.
# Requires curl and ability to make outbound HTTPS requests.
