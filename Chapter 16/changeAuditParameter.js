use admin;
db.admin.runCommand(
   {
      setAuditConfig: 1,
      filter:
         {
            atype: "authCheck",
            "param.command":
               {
                  $in: [ "find", "insert", "delete", "update", "findandmodify" ]
               }
         },
      auditAuthorizationSuccess: true
   }
)