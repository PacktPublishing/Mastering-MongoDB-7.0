db.getSiblingDB("$external").runCommand(
    {
      createUser: "CN=myName,OU=myOrgUnit,O=myOrg,L=myLocality,ST=myState,C=myCountry",
      roles: [
           { role: "readWrite", db: "test" },
           { role: "userAdminAnyDatabase", db: "admin" }
      ],
      writeConcern: { w: "majority" , wtimeout: 5000 }
    }
  )