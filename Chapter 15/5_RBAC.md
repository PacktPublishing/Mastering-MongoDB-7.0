## Create a read user
```javascript
use admin
db.createUser(
    {
        user: "myUserReadReports",
        pwd: promptPassword(),
        roles: [
            { role: "read", db: "reports" }
        ]
    }
)
```
### Authenticating
```bash
mongosh --user myUserReadReports
```
## Combining built-in roles
```javascript
use admin
db.createUser(
    {
        user: "myUserFinance",
        pwd: promptPassword(),
        roles: [
            { role: "read", db: "reports" },
            { role: "readWrite", db: "finance" }
        ]
    }
)
```
## Adding/revoking built-in roles and users
```javascript
use admin
db.grantRolesToUser(
    "myUserFinance",
    [
        { role: "read", db: "log" }
    ]
)
```
```javascript
use admin
db.revokeRolesFromUser(
    "myUserFinance",
    [
        { role: "read", db: "reports" }
    ]
)
```
## Changing a user's password
```javascript
use admin
db.changeUserPassword(
    "myUser",
    passwordPrompt()
)
```
## Updating a user
```javascript
db.updateUser(
    "myUser",
    {
        roles: []
    }
)
```
## Dropping a user
```javascript
db.dropUser(
    "myUser"
)
```
## Listing users / roles
```javascript
db.getUser("myUser")
```
```javascript
db.getUser(
    "myUser",
    {
        showPrivileges: true
    }
)
```
## Managing roles
```javascript
use admin
db.createRole(
    {
        role: "readAndInsert",
        privileges: [
            { 
                resource: { 
                    db: "myDB", 
                    collection: ""
                }, 
                actions: ["find", "insert"]
            }
        ],
        roles: []
    }
)
```
```javascript
use admin
db.grantRolesToUser(
    "myUser",
    [
        "readAndInsert"
    ]
)
```
```javascript
use admin
db.grantRolesToRole(
    "readAndInsert",
    [
        { 
            role: "readWrite", 
            db: "financeDB" 
        }
    ]
)
```
## Access restrictions
```javascript
use admin
db.createRole(
    {
        role: "readAndInsert",
        privileges: [
            { 
                resource: { 
                    db: "myDB", 
                    collection: ""
                }, 
                actions: ["find", "insert"]
            }
        ],
        roles: [],
        authenticationRestrictions: [
            { 
                clientSource: ["192.168.1.1", "192.168.1.2"],
                serverAddress: ["192.168.1.100"]
            }
        ]
    }
)
```