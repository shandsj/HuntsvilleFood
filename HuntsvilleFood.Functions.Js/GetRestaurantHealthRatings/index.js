const CosmosClient = require("@azure/cosmos").CosmosClient;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const search = (req.query.search || (req.body && req.body.search));
    if (search == null) {
        context.res = {
            status: 400,
            body: 'Missing required search parameter',
        }

        return;
    }

    if (search.length < 3) {
        context.res = {
            status: 400,
            body: 'search parameter must be at least 3 characters',
        }

        return;
    }

    const client = new CosmosClient({
        endpoint: process.env["COSMOSDB_ENDPOINT"],
        key: process.env["COSMOSDB_KEY"]
    });

    const database = client.database("HuntsvilleFood");
    const container = database.container("Ratings");


    const { resources: items } = await container.items
        .query({
            query: "SELECT * from c where LOWER(c.establishment) like \"%" + search.toLowerCase() + "%\""
        })
        .fetchAll();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: items
    };
}