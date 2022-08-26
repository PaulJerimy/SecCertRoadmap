/* Starter Azure CosmosDB connection code
const cosmos = require("@azure/cosmos");
const CosmosClient = cosmos.CosmosClient;

const endpoint = "[site]";
const masterKey = "[key]";
const client = new CosmosClient({ endpoint, auth: { masterKey } });
const databaseId = "roadmapdb";
const containerId = "scrcontainer";

const querySpec = {
    query: "SELECT * FROM c"    
};

async function run() {
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const { resources: results } = await container.items.query(querySpec, { enableCrossPartitionQuery: true }).fetchAll();

    for (var queryResult of results) {
        let resultString = JSON.stringify(queryResult);
        console.log(`\tQuery returned ${resultString}\n`);
    }
}

function handleError(error) {
    console.log(error);
    console.log("\nAn error with code '" + error.code + "' has occurred:");
    console.log("\t" + error.body || error);
}

run().catch(handleError); */
