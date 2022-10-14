module.exports = {
    Query: {
        hello: () => 'Hello world!',
        users: (_, __, { dataSources }) => dataSources.userAPI.getAllUsers(),
    },
};