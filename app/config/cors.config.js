const cors = require("cors");

module.exports = app => {
    const corsOptions = {
        origin: ["http://localhost:3000", "http://guan.pe"]
    };
    app.use(cors(corsOptions));
};
