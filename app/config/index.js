module.exports = (app, db) => {
    require("./cors.config")(app);
    require("./admin.config")(app, db);
    require("./bodyParser.config")(app);
};
