#!/bin/bash
# Script to insert a document using the MongoDB Atlas Data API

# This script uses the curl command to send an HTTPS POST request to the Atlas Data API.
# It inserts a single document into a specified collection within a MongoDB Atlas database.
# The API endpoint, database, collection, and document details are specified in the request body.

# Replace the following placeholders with your actual values before running this script:
# <Your-Atlas-API-Key>: Your MongoDB Atlas API key.
# myapp-abcde: The App ID of your MongoDB Atlas application.

curl -s "https://data.mongodb-api.com/app/myapp-abcde/endpoint/data/v1/action/insertOne" \
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

# Ensure the data source, database, and collection names accurately reflect your Atlas setup.
# The document field should contain the data you want to insert.
# This script assumes you have curl installed and can make outbound HTTPS requests.
