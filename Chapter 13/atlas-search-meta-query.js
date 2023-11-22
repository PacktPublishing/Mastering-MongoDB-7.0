// MongoDB Atlas Search Metadata Query using $searchMeta Pipeline Stage

db.collection.aggregate([
  {
    // The $searchMeta stage returns metadata about the search results
    $searchMeta: {
      "index": "yourIndexName",           // The name of the Atlas Search index
      "text": {                           // Text search operator
        "query": "search term",
        "path": "fieldToSearch"
      },
      "count": {}                         // Count options for the results
    }
  },
  // Additional aggregation stages can be added here if needed
]);
