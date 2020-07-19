module.exports = app => {
    const business = require("../controllers/business.controller.js");
    const router = require("express").Router();

    router.post("/", business.create);
    app.use('/api/business', router);
};
