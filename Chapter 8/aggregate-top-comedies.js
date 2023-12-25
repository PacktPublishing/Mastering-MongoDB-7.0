// match movies genre 'Comedy' with IMDB rating greater than 8.5
// sort descending by rating
// set a string 'castString' by concatenating the cast array into a string
// limit to the top 5
db.getCollection('movies').aggregate(
    [{
            $match: {
                'imdb.rating': {
                    $gt: 8.5
                },
                genres: 'Comedy'
            }
        },
        {
            $sort: {
                'imdb.rating': -1
            }
        },
        {
            $set: {
                castString: {
                    $reduce: {
                        input: '$cast',
                        initialValue: 'Cast:',
                        in: {
                            $concat: ['$$value', '$$this', ';']
                        }
                    }
                }
            }
        },
        {
            $limit: 5
        }
    ],
);


// expected output (sample)
[{
    _id: ObjectId("573a13f0f29313caabdd9d6e"),
    title: 'Over the Garden Wall',
    year: 2014,
    imdb: {
        rating: 9.2
    },
    castString: 'Cast:Elijah Wood;Collin Dean;Melanie Lynskey;'
}, ]