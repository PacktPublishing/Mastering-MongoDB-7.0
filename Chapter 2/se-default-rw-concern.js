// Set of commands for setting default read and write concerns in MongoDB using mongosh

// Execute an admin command to set default read and write concerns
db.adminCommand({
    setDefaultRWConcern : 1,
    
    // Specify the default read concern here
    // Replace '<read concern>' with your desired read concern configuration
    // For example: { level: "local" }
    defaultReadConcern: { <read concern> },

    // Specify the default write concern here
    // Replace '<write concern>' with your desired write concern configuration
    // For example: { w: 1, j: true }
    defaultWriteConcern: { <write concern> },

    // Optionally, you can also specify a write concern for this operation
    // For example: { w: "majority", wtimeout: 5000 }
    writeConcern: { <write concern> },

    // Optional comment field
    comment: <any>
})
