use admin
db.createUser(
    {
        user: "myUserAdmin",
        pwd: promptPassword(),
        roles: [
            { role: "userAdmin", db: "admin" }
        ]
    }
)