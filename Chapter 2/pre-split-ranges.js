// Script for pre-splitting ranges in a sharded MongoDB collection using mongosh

// Define split points for the collection
var splitPoints = [20, 50, 100];

// Pre-splitting the collection into chunks at the specified split points
for(var i = 0; i < splitPoints.length; i++) {
  db.adminCommand({
    split: "myapp.products",
    middle: { price: splitPoints[i] }
  });
}
