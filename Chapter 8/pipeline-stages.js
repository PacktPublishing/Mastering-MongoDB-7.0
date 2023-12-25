var projectStage = {
    "$project": ["imdb.rating", "title"]
};
var sortStage = {
    "$sort": {
        "imdb.rating"
    }
};
var pipeline = [projectStage, sortStage];
db.getCollection('movies').aggregate(pipeline)

// define two stages: project and sort and add them to a pipeline