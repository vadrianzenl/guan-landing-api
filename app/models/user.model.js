module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING,
            required: true
        },
        encryptedPassword: {
            type: Sequelize.STRING,
            required: true
        },
        role: {
            type: Sequelize.STRING,
            enum: ['admin', 'restricted'],
            required: true
        }
    }, {
        tableName: 'user'
    });

    return User;
};
