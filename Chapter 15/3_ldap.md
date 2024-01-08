## Bind
```bash
ldapsearch -h <your_host> -D '<your_domain>\<your_user>' -w '<your_password>'
```
## Queries
```bash
ldapsearch -h serverldap.net -D '<your_domain>\<your_user>' -w '<your_password>' -b 'DC=serverldap,DC=net' -s sub "sAMAccountName=adminMongoDB"
```
```bash
ldapsearch -h serverldap.net -D '<your_domain>\<your_user>' -w '<your_password>' -b 'DC=serverldap,DC=net' "sAMAccountName=adminMongoDB" -s one cn name distinguishedName memberOf
```
## Protecting your credentials
```bash
grep "TLS_CACERT " /etc/openldap/ldap.conf || echo "TLS_CACERT       /etc/openldap/certs/ldapCertificate.cert" | sudo tee --append /etc/openldap/ldap.conf
```
```bash
ldapsearch -h serverldap.net -D '<your_domain>\<your_user>' -w '<your_password>' -b 'CN=Users,DC=serverldap,DC=net' -ZZ -s sub "sAMAccountName=adminMongoDB" cn name distinguishedName memberOf
```
## Binding a group to a role
```javascript
use admin
db.createRole(
    {
        role:"CN=Mongo Admins,CN=Users,DC=mdbrecruit,DC=net",
        privileges:[],
        roles:[
            {role:"root",db:"admin"}
        ]
    }
)
```
### Connect
```bash
mongosh -u your_user -p your_password --authenticationDatabase '$external' --authenticationMechanism=PLAIN  --tls --tlsCAFile=/etc/pki/tls/certs/ca.cert --host your_server_mongodb
```
