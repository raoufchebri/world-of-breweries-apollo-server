# The Breweries Server

## Summary
The Breweries server is a GraphQL Apollo Server written in TypeScript that queries <b>Open Brewery DB</b> API server to return the following:
- Brewery information by ID
- List of breweries by city
- List of breweries by type
- List of breweries by zipcode

For more information, visit https://www.openbrewerydb.org/

## Installation
To get started, execute the following command on your terminal:
<code>npm install</code>

## Structure
You can find the main files in the src folders:<br/>
+-- /src<br/>
+------ dataSource.ts<br/>
+------ index.ts<br/>
+------ schema.ts<br/>

The index.ts file contains the Apollo Server instance that is used to run the server.

The dataSource.ts file contains the API classes that are extended from RESTDataSource which allows fetching data from a REST API and exposing it via GraphQL within Apollo Server. For more information about RestDataSource, visit 
https://www.npmjs.com/package/apollo-datasource-rest.

The schema.ts file represents the types defintions along witht their respestive resolver-functions, that are then passed to makeExecutableSchema object for Apollo to interpret the queries.
