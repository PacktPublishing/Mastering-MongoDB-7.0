// get the total amount of money per sale

db.getCollection('sales').aggregate(
    [{
            $set: {
                items: {
                    $map: {
                        input: '$items',
                        as: 'item',
                        in: {
                            $mergeObjects: [
                                '$$item',
                                {
                                    cost: {
                                        $multiply: [
                                            '$$item.price',
                                            '$$item.quantity'
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $set: {
                totalAmount: {
                    $sum: '$items.cost'
                }
            }
        }
    ]
)

