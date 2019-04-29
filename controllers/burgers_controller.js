var express = require("express");
var burger = require("../models/burger.js");
var router = express.Router();

router.get("/", function(req, res){
    burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/burger/create", function(req, res){
    burger.insertOne(req.body.burger_name, function(result){
        res.json({id: result.insertId});
    });
});

router.put("/burger/eat/:id", function(req, res){
    burger.updateOne(req.body.id, function(result){
        if(result.changedRows === 0){
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

module.exports = router;