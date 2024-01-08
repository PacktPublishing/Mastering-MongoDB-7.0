// MongoDB Atlas Search: Counting Products within a Specific Price Range using $searchMeta

db.products.aggregate([
  {
    // The $searchMeta stage is used for obtaining metadata about search results
    "$searchMeta": {
      "range": {
        "path": "price",   // The field to perform the range query on
        "gte": 50,         // Greater than or equal to 50
        "lt": 100          // Less than 100
      },
      "count": {
        "type": "total"   // Count type, here we're using 'total' for the total count
      }
    }
  }
  // This query will return the total count of products with prices between 50 and 100 dollars
]);
