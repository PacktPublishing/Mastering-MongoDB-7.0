// checks the value of the permissions field and the value 2 and sets the hasWritePermissions

db.user.aggregate([
    {
        $set: {
            hasWritePermissions: {
                $eq: [
                    {
                        $bitAnd: ["$permissions", 2]
                    },
                    2]
            }
        }
    }
])