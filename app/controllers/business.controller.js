const db = require("../models");
const Business = db.business;

exports.create = (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            message: "Email can not be empty!"
        });
        return;
    }

    const business = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    };

    Business.create(business)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Business."
            });
        });
};
