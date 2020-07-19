const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();

db.sequelize.sync();

/*var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Guan Landing API application." });
});

require("./app/routes/customer.routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
