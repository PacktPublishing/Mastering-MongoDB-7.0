// Set of commands for resizing the oplog of a MongoDB replica set using mongosh

// Execute an admin command to resize the oplog
db.adminCommand({
    replSetResizeOplog: 1, // This parameter initiates the oplog resize operation

    // Specify the new size of the oplog in megabytes
    // Replace '<double>' with the desired size, for example, 1024.5 for 1024.5 MB
    size: <double>,

    // Optionally, set the minimum retention time for oplog entries in hours
    // Replace '<double>' with the desired retention time, for example, 24.0 for 24 hours
    minRetentionHours: <double>
})
