// example MongoDB client session for updating a product
orders = client.db.orders
inventory = client.db.inventory
with client.start_session() as session:
    with session.start_transaction():
    orders.insert_one({
        "sku": "abc123",
        "qty": 100
    }, session = session)
inventory.update_one({
        "sku": "abc123",
        "qty": {
            "$gte": 100
        }
    }, {
        "$inc": {
            "qty": -100
        }
    },
    session = session,
)