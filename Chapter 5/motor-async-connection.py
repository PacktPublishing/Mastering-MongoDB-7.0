# MongoDB Connection Using Motor Asynchronous Driver in Python

# Install Motor using pip:
# python -m pip install motor

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi

async def ping_server():
    # Replace the placeholder with your Atlas connection string
    uri = "<connection_string>"
    
    # Set the Stable API version when creating a new client
    client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))
    
    # Send a ping to confirm a successful connection
    try:
        await client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

# Run the asynchronous ping function
asyncio.run(ping_server())

# Note: Replace <connection_string> with your actual MongoDB Atlas connection string.
# Ensure you're using Motor driver version 2.5 or newer for MongoDB Server version 5.0+.
