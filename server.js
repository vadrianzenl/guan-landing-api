const express = require("express");
const db = require("./app/models");
db.sequelize.sync();
const app = express();

require("./app/config/cors.config")(app);
require("./app/config/admin.config")(app, db);
require("./app/config/bodyParser.config")(app);
require("./app/routes/customer.routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
