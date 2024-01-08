// List db users in Atlas using mongocli 
mongocli atlas dbusers list

// Enable access db from current IP
mongocli atlas accessLists create --currentIp

//Authenticate Atlas
mongocli auth login

//Authenticate Cloud Manager
mongocli auth login --cm
