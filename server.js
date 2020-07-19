const express = require("express");
require('dotenv').config();
const db = require("./app/models");
db.sequelize.sync();
const app = express();

require("./app/config")(app, db);
require("./app/routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
