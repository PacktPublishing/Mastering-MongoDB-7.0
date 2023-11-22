// Set of commands for configuring a delayed member in a MongoDB replica set using mongosh

// Retrieve the current replica set configuration
var cfg = rs.conf();

// Configure a specific member as hidden and with no priority
// 'n' should be replaced with the index of the member you wish to configure
// Setting 'hidden' to true makes the member invisible to client applications
// Setting 'priority' to 0 ensures this member will not become primary
cfg.members[n].hidden = true;
cfg.members[n].priority = 0;

// Set a delay for the first member of the replica set
// The delay is set in seconds, here it's set to 3600 seconds (1 hour)
// This member will lag behind the primary by the specified amount of time
cfg.members[0].secondaryDelaySecs = 3600;

// Apply the updated configuration to the replica set
rs.reconfig(cfg);
