## Creating a user
```javascript
use $external
db.createUser(
   {
     user: "application/finance@MYCOMPANY.NET",
     roles: [ { role: "read", db: "finance" } ]
   }
)
```
## Authenticating
```bash
kinit your-principal@YOUR.REALM
mongosh --host your.server.fqdn -u "your-principal@YOUR.REALM" --authenticationMechanism=GSSAPI --authenticationDatabase='$external'
```