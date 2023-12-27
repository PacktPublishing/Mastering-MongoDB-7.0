curl --user "{public_key:private_key}" \
  --digest \
  --header "Accept: application/gzip" \
  GET "https://cloud.mongodb.com/api/atlas/v2/groups/{group_id}/clusters/{hostname}/logs/{logName}.gz"