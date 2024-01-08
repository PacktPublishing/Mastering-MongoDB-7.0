// Set of commands for configuring hidden members in a MongoDB replica set using mongosh

// Retrieve the current replica set configuration
var cfg = rs.conf();

// Configure a specific member as hidden
// 'n' should be replaced with the index of the member you wish to hide
// Setting 'hidden' to true makes the member invisible to client applications
// Setting 'priority' to 0 ensures this member will not become primary
cfg.members[n].hidden = true;
cfg.members[n].priority = 0;

// Apply the updated configuration to the replica set
rs.reconfig(cfg);
