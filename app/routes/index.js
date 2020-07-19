module.exports = app => {
    require("./customer.routes")(app);
    require("./business.routes")(app);
};
