// script for creation of three users in the sample_airbnb database

const {
    MongoClient
} = require("mongodb");
async function createMultipleUsers(client, newUsers) {
    // function that inserts three users
    const result = await client
        .db("sample_airbnb")
        .collection("users")
        .insertMany(newUsers);
    console.log(
        '${result.insertedCount} new user(s) created with the following id(s):'
    );
    console.log(result.insertedIds);
}
async function main() {
    const uri = "mongodb+srv://your-connection-string/";
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Create 3 new users in the users collection
        await createMultipleUsers(client, [{
                email: "leslie@example.com",
                name: "Leslie Yepp",
            },
            {
                email: "april@example.com",
                name: "April Ludfence",
            },
            {
                email: "tom@example.com",
                name: "Tom Haverdodge",
            },

        ]);
        const createIndexResults = await client
            .db("sample_airbnb")
            .collection("users")
            .createIndex({
                email: 1
            }, {
                unique: true
            });
        console.log('Index successfully created: ${createIndexResults}');
    } finally {
        await client.close();
    }
}
main().catch(console.error);