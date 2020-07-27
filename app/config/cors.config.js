const cors = require("cors");

module.exports = app => {
    const corsOptions = {
        origin: ["http://localhost:3000", "https://guan.pe", "https://wwww.guan.pe"]
    };
    app.use(cors(corsOptions));
};
