// facet movies by IMDB and RottenTomatoes ratings
db.getCollection('movies').aggregate(
    [{
            $match: {
                year: 1995,
                genres: 'Drama'
            }
        },
        {
            $facet: {
                by_imdb: [{
                        $bucketAuto: {
                            groupBy: '$imdb.rating',
                            buckets: 3,
                            output: {
                                count: {
                                    $sum: 1
                                },
                                movies: {
                                    $push: '$title'
                                }
                            }
                        }
                    },
                    {
                        $set: {
                            imdb_range: '$_id'
                        }
                    },
                    {
                        $unset: ['_id']
                    }
                ],
                by_tomato: [{
                        $bucketAuto: {
                            groupBy: '$tomatoes.critic.rating',
                            buckets: 3,
                            output: {
                                count: {
                                    $sum: 1
                                },


                                movies: {
                                    $push: '$title'
                                }
                            }
                        }
                    },
                    {
                        $set: {
                            rating_range: '$_id'
                        }
                    },
                    {
                        $unset: ['_id']
                    }
                ]
            }
        }
    ],
);

// part of the output

/* [{
    by_imdb: [{
    count: 76,
    movies: [
    'Gordy',
    'I Shot a Man in Vegas',// …more movies here
    imdb_range: {
    min: 3.9,
    max: 6.6
    }
    }, */