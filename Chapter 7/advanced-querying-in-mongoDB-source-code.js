// Chapter 7 Queries and Source Code

// Semester Average Grade Query - Page 3
db.student_grades.aggregate([
  {
    $match: { semester: "Fall 2023" },
  },
  {
    $group: {
      _id: "$student_id",
    },
  },
  {
    $project: {
      // Calculate average
      averageGrade: { $divide: ["$totalGrade", "$totalCourses"] },
    },
  },
]);
// ----------------------------------------------------------------

// Query that retrieve users whose age is greater than 22 - Page 4
db.users.aggregate([{ $match: { age: { $gt: 22 } } }]);
// ----------------------------------------------------------------

// Query that get only three users. - Page 5
db.users.aggregate([{ $limit: 3 }]);
// ----------------------------------------------------------------

// Query that sort users by age in descending order. - Page 6
db.users.aggregate([{ $sort: { age: -1 } }]);
// ----------------------------------------------------------------

// Query that skip the first 10 users. - Page 6
db.users.aggregate([{ $skip: 10 }]);
// ----------------------------------------------------------------

// Query that return only the username and phone number of each user. - Page 8
db.users.aggregate([{ $project: { username: 1, phoneNumber: 1 } }]);
// ----------------------------------------------------------------

// Query that gets the average age of users, and group them by their country. - Page 8
db.users.aggregate([
  { $group: { _id: "$country", averageAge: { $avg: "$age" } } },
]);
// ----------------------------------------------------------------

// Query that unwind the hobbies array and produce a document for each hobby they have. - Page 9
db.users.aggregate([{ $unwind: "$hobbies" }]);
// ----------------------------------------------------------------

// Query that combine orders and products collections. - Page 11
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "_id",
      as: "productDetails",
    },
  },
]);
// ----------------------------------------------------------------

// Query that join orders with in-stock products,adding a product Details field to each order that includes the product's name and price - Page 12
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      let: { order_product_id: "$product_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$_id", "$$order_product_id"] },
                // Matches only in-stock products
                { $gt: ["$stock", 0] },
              ],
            },
          },
        },
        { $project: { name: 1, price: 1 } },
      ],
      as: "productDetails",
    },
  },
]);
// ----------------------------------------------------------------

// Query that find the closest restaurants to a specific location. - Page 14
db.restaurants.aggregate([
  {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [-73.99279, 40.719296],
      },
      distanceField: "distance",
      maxDistance: 2000,
      spherical: true,
    },
  },
]);
// ----------------------------------------------------------------

// Query that display only the documents that the users have read access to. - Page 16
db.docs.aggregate([
  {
    $redact: {
      $cond: {
        if: { $eq: ["$access", "read"] },
        then: "$$DESCEND",
        else: "$$PRUNE",
      },
    },
  },
]);
// ----------------------------------------------------------------

// Query to replace the document with its profile field - Page 17
db.users.aggregate([
  {
    $replaceWith: "$profile",
  },
]);
// ----------------------------------------------------------------

// Query to find documents where the age is either 18 or 25. - Page 18
db.users.find({ $or: [{ age: 18 }, { age: 25 }] });
// ----------------------------------------------------------------

// Query to find documents where the age is 22 and the name is Elie. - Page 19
db.users.find({ age: 22, name: "Elie" });
db.users.find({ $and: [{ age: 22 }, { name: "Alice" }] });
// ----------------------------------------------------------------

// Query to returns documents where the age is not 18. - Page 19
db.users.find({ age: { $not: { $eq: 18 } } });
// ----------------------------------------------------------------

// Query that return documents where the age isn't 22 and the name isn't Elie. - Page 20
db.users.find({ $nor: [{ age: 22 }, { name: "Elie" }] });
// ----------------------------------------------------------------

// Query that return only those people with a specific age - Page 21
db.users.find({ age: { $in: [18, 20, 22] } }); // age is 18, 20, or 22
// ----------------------------------------------------------------

// Query that return only those people that are not in a specific age - Page 21
db.users.find({ age: { $nin: [18, 20, 22] } });
// ----------------------------------------------------------------

// Query that find airplanes with exactly 200 seats. - Page 22
db.airplanes.find({ seats: 200 });
// Or using $eq
db.airplanes.find({ seats: { $eq: 200 } });
// ----------------------------------------------------------------

// Query that retrieve all airplanes except those with the model Boeing 777 - Page 22
db.airplanes.find({ model: { $ne: "Boeing 777" } });
// ----------------------------------------------------------------

// Query that retrieve airplanes with maxSpeed greater than 500 and lower than 700. - Page 23
db.airplanes.find({
  maxSpeed: {
    $gt: 500,
    $lte: 700,
  },
});
// ----------------------------------------------------------------

// Query that find documents where tags contain both nosql and mongodb - Page 24
db.books.find({ tags: { $all: ["nosql", "mongodb"] } });
// ----------------------------------------------------------------

// Query that finds league Entries with Scores Between 80 and 85 - Page 26
db.league.find({
  results: {
    $elemMatch: {
      score: {
        $gte: 80,
        $lt: 85,
      },
    },
  },
});
// ----------------------------------------------------------------

// Query that returns documents where the tags array has exactly three elements - Page 27
db.books.find({ tags: { $size: 3 } });
// ----------------------------------------------------------------

// Query that add a new AirFly route to Tokyo to a list of routes - Page 28
db.airlines.updateOne({ name: "AirFly" }, { $push: { destinations: "Tokyo" } });
// Then perform a find, to return the updated documents
db.airlines.find({});
// ----------------------------------------------------------------

// Query that remove Paris from the list of AirFly destinations - Page 29
db.airlines.updateOne({ name: "AirFly" }, { $pull: { destinations: "Paris" } });
// Then perform a find, to return the updated documents
db.airlines.find({});
// ----------------------------------------------------------------

// Query tht check that Berlin does not exist in the destinations array - Page 30
db.airlines.updateOne(
  { name: "AirFly" },
  { $addToSet: { destinations: "Berlin" } }
);
// Then perform a find, to return the updated documents
db.airlines.find({});
// ----------------------------------------------------------------

// Query that removes the last element from the desitnations array - Page 31
db.airlines.updateOne({ name: "AirFly" }, { $pop: { destinations: 1 } });
// Then perform a find, to return the updated documents
db.airlines.find({});
// ----------------------------------------------------------------

// Query that uses $ to find the first review by Bob. - Page 32
db.books.find({ "reviews.reviewer": "Bob" }, { "reviews.$": 1 });
// ----------------------------------------------------------------

// Query that return the students with Scores Ranging from 85 to 90  - Page 32
db.students.find({ scores: { $elemMatch: { $gte: 85, $lte: 90 } } });
// ----------------------------------------------------------------

// Query that return only the last three scores. - Page 32
db.league.find({}, { scores: { $slice: -3 } });
// ----------------------------------------------------------------

// Create a single field index on the username field - Page 34
db.users.createIndex({ username: 1 });
// ----------------------------------------------------------------

// Create a compound index that orders firstname in ascending order and lastname in descending order.  - Page 34
db.users.createIndex({ firstname: 1, lastname: -1 });
// ----------------------------------------------------------------

// Create a multikey index on the tags field - Page 34
db.collection.createIndex({ tags: 1 });
// ----------------------------------------------------------------

// Create a compound multi-key index on tags and ratings array - Page 34
db.collection.createIndex({ tags: 1, rating: -1 });
// ----------------------------------------------------------------

// Create a text index on the description field - Page 35
db.post.createIndex({ description: "text" });
// ----------------------------------------------------------------

// Create a wildcard index on all document fields - Page 35
db.users.createIndex({ "$**": 1 });
// ----------------------------------------------------------------

// Create a time to live index that Auto-remove each log entry 1 hour after it was made - Page 35
db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
// ----------------------------------------------------------------

// Create an index to ensure the username is unique - Page 35
db.users.createIndex({ username: 1 }, { unique: true });
// ----------------------------------------------------------------

// Create a partial index for users with age greater than or equal 18 - Page 36
db.users.createIndex(
  { age: 1 },
  {
    partialFilterExpression: {
      age: {
        $gte: 18,
      },
    },
  }
);
// ----------------------------------------------------------------

// Create an index for legacy coordinate pairs - Page 36
db.collection.createIndex({ loc: "2d" });
// ----------------------------------------------------------------

// Create a 2dsphere index for the loc field - Page 37
db.collection.createIndex({ loc: "2dsphere" });
// ----------------------------------------------------------------

// Query nearby places using $maxDistance - Page 37
db.places.createIndex({ location: "2dsphere" });
//Querying for nearby places (within 500 meters of a point):
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [-73.9667, 40.78] },
      $maxDistance: 500,
    },
  },
});
// ----------------------------------------------------------------

// Query documents within a polygon shape - Page 38
db.places.find({
  location: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [
          [
            [0, 0],
            [3, 6],
            [6, 1],
            [0, 0],
          ],
        ],
      },
    },
  },
});
// ----------------------------------------------------------------
