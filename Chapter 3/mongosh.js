// Installing mongosh using npm
npm install -g mongosh

// Command to login to a mongosh shell
mongosh "mongodb://username:password@hostname:port/dbname"

// Sample commands to run inside mongosh shell
// list all dbs
show dbs
// switch to org db
use org
// list all collections in current db
show collections
// find all documents in employees collection
db.employees.find()
//list all available commands in mongosh shell
help

// Administrative commands
// Create new user mark with dbOwner role
db.runCommand({
createUser: "mark",
pwd: "test123",
roles: [
{ role: "dbOwner",db: "admin" }
]
})

// Loading javascript in mongosh
load("connect-and-insert.js" )




