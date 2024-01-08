// Script for setting up a stream processor in MongoDB Atlas
// This processor monitors network traffic data, excludes local traffic,
// groups messages every minute, and merges the processed data into a MongoDB Atlas collection.

let p = [
    {
        $source: {
            name: 'kafkaProd',  // Name of the Kafka data source
            topic: 'Nettraffic'  // Kafka topic for network traffic
        }
    },
    {
        $validate: {
            validator: {
                $expr: {
                    $ne: ["$ip_source", "127.0.0.1"]  // Exclude local traffic from 127.0.0.1
                }
            }
        }
    },
    {
        $tumblingWindow: {
            interval: {
                size: Number(60),  // Group messages every 60 seconds
                unit: "second"
            },
            pipeline: [
                {
                    $group: {
                        _id: "$ip_source",  // Group by source IP
                        count_reset: {$sum: 1}  // Count the number of messages
                    }
                }
            ]
        }
    },
    {
        $merge: {
            name: 'AtlasCluster',  // Name of the target Atlas cluster
            db: 'ID',  // Target database
            coll: "DDSattacks"  // Target collection for processed data
        }
    }
];

// Create the stream processor named 'netattacks' with the defined pipeline
db.createStreamProcessor('netattacks', p, dlq);

// Start the stream processor
sp.netattacks.start();
