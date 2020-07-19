module.exports = app => {
    const customer = require("../controllers/customer.controller.js");
    const router = require("express").Router();

    router.post("/", customer.create);
    app.use('/api/customers', router);
};
