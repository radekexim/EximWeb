const express = require('express');
const cors = require("cors");
//Dodanie serwera APOLLLO do obługi GraphQL
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./GraphQL/schema');
const resolvers = require('./GraphQL/resolvers')
const UserAPI = require('./GraphQL/datasources/users');

const app = express();
const { port } = require('./config');

// Testowy serwer APOLLO

async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
            userAPI: new UserAPI(),
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}

startServer();

//routes
const apiRouter = require('./routes/api');

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);
//server
app.listen(port, function () {
    console.log('Serwer słucha... http://localhost:' + port);
})