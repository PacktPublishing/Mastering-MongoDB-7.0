// Set of commands for clearing the jumbo flag on chunks in a sharded MongoDB collection using mongosh

// Command to clear the jumbo flag using the bounds of the chunk
// Replace 'sample.customers' with your collection's namespace
// Replace the 'bounds' values with the actual boundaries of your jumbo chunk
db.adminCommand({
   clearJumboFlag: "sample.customers",
   bounds: [{"x": 5}, {"x": 6}] // Specify the bounds of the jumbo chunk
})

// Alternatively, command to clear the jumbo flag using a find document
// Useful when the exact bounds are not known or for non-hashed shard keys
// Replace 'sample.customers' with your collection's namespace
// Replace the 'find' value with a shard key value within your jumbo chunk
db.adminCommand({
   clearJumboFlag: "sample.customers",
   find: {"x": 5} // Specify a document within the jumbo chunk
})
