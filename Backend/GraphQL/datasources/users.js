const { RESTDataSource } = require('apollo-datasource-rest');

class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:5000/api/';
    }

    async getAllUsers() {
        const response = await this.get('accounts');
        return Array.isArray(response)
            ? response.map(user => this.userReducer(user))
            : [];
    }

    userReducer(user) {
        return {
            id: user.id || 0,
            name: user.name,
            email: user.email,
            password: user.password,
            isrole: user.isrole,
        }
    }

}

module.exports = UserAPI;