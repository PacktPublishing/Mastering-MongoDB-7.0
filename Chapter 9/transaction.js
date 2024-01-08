const {
    MongoClient
} = require("mongodb");

function createReservationDocument(
    // Helper function for creating the reservation document
    nameOfListing,
    reservationDates,
    reservationDetails
) {
    // Create the reservation
    let reservation = {
        name: nameOfListing,
        dates: reservationDates,
    };
    // Add additional properties from reservationDetails to the reservation
    for (let detail in reservationDetails) {
        reservation[detail] = reservationDetails[detail];
    }
    return reservation;
}


async function createReservation(
    client,
    userEmail,
    nameOfListing,
    reservationDates,
    reservationDetails
) {
    const usersCollection = client.db("sample_airbnb").collection("users");
    const listingsAndReviewsCollection = client
        .db("sample_airbnb")
        .collection("listingsAndReviews");

    const reservation = createReservationDocument(
        nameOfListing,
        reservationDates,
        reservationDetails
    );

    const session = client.startSession();
    const transactionOptions = {
        readPreference: "primary",
        readConcern: {
            level: "local"
        },
        writeConcern: {
            w: "majority"
        },
    };


    try {
        const transactionResults = await session.withTransaction(async () => {
                const usersUpdateResults = await usersCollection.updateOne({
                    email: userEmail
                }, {
                    $addToSet: {
                        reservations: reservation
                    }
                }, {
                    session
                });
                console.log(
                    '${usersUpdateResults.matchedCount} document(s) found in the users collection with the email address ${userEmail}.'
                );
                console.log(
                    '${usersUpdateResults.modifiedCount} document(s) was/were updated to include the reservation.'
                );

                const isListingReservedResults =
                    await listingsAndReviewsCollection.findOne({
                        name: nameOfListing,
                        datesReserved: {
                            $in: reservationDates
                        }
                    }, {
                        session
                    });

                if (isListingReservedResults) {
                    await session.abortTransaction();
                    console.error(
                        "This listing is already reserved for at least one of the given dates.The reservation could not be created."
                    );
                    console.error(
                        "Any operations that already occurred as part of this transaction will be rolled back."
                    );
                    return;
                }

                const listingsAndReviewsUpdateResults =
                    await listingsAndReviewsCollection.updateOne({
                        name: nameOfListing
                    }, {
                        $addToSet: {
                            datesReserved: {
                                $each: reservationDates
                            }
                        }
                    }, {
                        session
                    });
                console.log(
                    '${listingsAndReviewsUpdateResults.matchedCount} document(s) found in the listingsAndReviews collection with the name ${nameOfListing}'
                );
                console.log(
                    '${listingsAndReviewsUpdateResults.modifiedCount} document(s) was/were updated to include the reservation dates.'
                );
            },
            transactionOptions);
    } catch (e) {
        console.log("The transaction was aborted due to an unexpected error: " +
            e);
    } finally {
        await session.endSession();
    }
}

async function main() {
    const uri =
        // your Atlas connection string
        "mongodb+srv://your-atlas-URI/";
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await createReservation(
            client,
            "leslie@example.com",
            "Nice room in Barcelona Center",
            [new Date("2023-12-31"), new Date("2024-01-01")], {
                pricePerNight: 180,
                specialRequests: "Late checkout",
                breakfastIncluded: true,
            }
        );
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error)