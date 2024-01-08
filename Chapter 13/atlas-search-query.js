// MongoDB Atlas Search Query using $search Pipeline Stage

db.products.aggregate([
  {
    // The $search stage performs a full-text search
    "$search": {
      "near": {
        "path": "price",    // The field to search
        "origin": 100,      // The central value of the search
        "pivot": 10         // Range around the origin (90 to 110 in this case)
      }
    }
  },
  {
    // The $project stage shapes the output of the data
    $project: {
      "_id": 0,           // Excludes the '_id' field
      "name": 1,          // Includes the 'name' field
      "price": 1          // Includes the 'price' field
    }
  },
  { "$limit": 5 },        // Limits the output to the top 5 matches

  // The $facet stage organizes results into categories
  {
    "$facet": {
      "docs": [],        // Top 5 search results
      "meta": [          // Search metadata such as score
        {"$replaceWith": "$$SEARCH_META"},
        {"$limit": 1}
      ]
    }
  }
]);
