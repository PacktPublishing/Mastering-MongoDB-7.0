##  Connecting using Ruby  ##

#you can connect to a database, as shown in the following example:
require 'mongo'
client = Mongo::Client.new(['127.0.0.1:27017'], database: 'test')
#Or, you can also use a URI connection string:
client = Mongo::Client.new('mongodb://127.0.0.1:27017/test')

#connecting to a single database instance called test in your 
#localhost. In most use cases, you would at least have a replica set to connect to, as shown in 
#the following snippet:
client_host = ['server1_host:server1_port_number, server2_host:server2_
port_number']
client_options = {
 database: 'YOUR_DATABASE_NAME',
 replica_set: 'REPLICA_SET_NAME',
 user: 'YOUR_USERNAME',
 password: 'YOUR_PASSWORD'
}
client = Mongo::Client.new(client_host, client_options)
#Or you can connect using URI syntax as shown in the following code snippet:
client = Mongo::Client.new("mongodb://127.0.0.1:27017,127.0.0.1:27018/mydb")

#connect to the MongoDB process serving as the MongoDB router.
#Assuming mongos is running on localhost and default port 27017
client = Mongo::Client.new(['localhost:27017'], :database =>'my_sharded_database')

#connect to a shared cluster
#Assuming mongos is running on localhost and default port 27017
client = Mongo::Client.new(['localhost:27017'], :database =>'my_sharded_database')

#Connecting to multiple mongos instances
client = Mongo::Client.new(['mongos1_host:27017', 'mongos2_host:27017', 'mongos3_host:27017'], :database => 'my_sharded_database')

#to configure the ORM for your Rails application to use Mongoid by adding the following to application.rb:
config.generators do |g|
 g.orm: mongoid
end 

#then adapt your models to be stored in MongoDB. All it takes is a single line of code included 
#in the model declaration, as illustrated in the following example:
class Person
 include Mongoid::Document
 include Mongoid::Timestamps
end 


#Inheritance with Mongoid models
class Canvas
 include Mongoid::Document
 field: name, type: String embeds_many: shapes
end
class Shape
 include Mongoid::Document
 field: x, type: Integer
 field: y, type: Integer embedded_in: canvas
end
class Circle < Shape
 field: radius, type: Float
end
class Rectangle < Shape
 field: width, type: Float
 field: height, type: Float
end

