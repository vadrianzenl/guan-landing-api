module.exports = (sequelize, Sequelize) => {
    const Business = sequelize.define("business", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'business'
    });

    return Business;
};
