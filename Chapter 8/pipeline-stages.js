var projectStage = {
    "$project": ["imdb.rating", "title"]
};
var sortStage = {
    "$sort": {
        "imdb.rating": 1
    }
};
var pipeline = [projectStage, sortStage];
db.getCollection('movies').aggregate(pipeline)

// define two stages: project and sort and add them to a pipeline