// Script for manually moving data ranges in a sharded MongoDB collection using mongosh

// Define the shards to which the data ranges will be moved
var shards = ["shard0000", "shard0001", "shard0002", "shard0003"];

// Manually moving the data ranges to balance the distribution across shards
for (var i = 0; i < shards.length; i++) {
  var lowerBound = { price: MinKey };
  if (i > 0) {
    lowerBound = { price: splitPoints[i-1] };
  }

  var upperBound = { price: MaxKey };
  if (i < splitPoints.length - 1) {
    upperBound = { price: splitPoints[i] };
  }

  db.adminCommand({
    moveChunk: "myapp.products",
    find: lowerBound, 
    to: shards[i],
    bounds: [lowerBound, upperBound]
  });
}
