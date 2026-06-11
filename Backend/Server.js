require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

const app = express();

app.use(cors());
app.use(express.json());

dns.setServers(['8.8.8.8', '8.8.4.4']);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const typeDefs = `#graphql
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello GraphQL!",
    },
};

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(
        "/graphql",
        expressMiddleware(server)
    );

    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
}

startServer();