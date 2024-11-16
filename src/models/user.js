class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    static findByUsername(username) {
        return users.find(user => user.username === username);
    }

    static create(username, password) {
        const newUser = new User(users.length + 1, username, password);
        users.push(newUser);
        return newUser;
    }
}

const users = [
    new User(1, 'user', 'password')
];

module.exports = User;
