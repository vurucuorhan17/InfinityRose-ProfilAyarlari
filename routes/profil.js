const express = require("express");
const router = express.Router();
const path = require("path");

const Profil = require("../models/Profil");

router.get("/user/:id",(req,res) => {
    Profil.findOne({_id:req.params.id}).then(users => {
        let jsonUser = users.toJSON();
        // let jsonUserId = jsonUser._id;
        // console.log(jsonUser.name);
        res.render("site/profil",{user:jsonUser});
    });
});

router.put("/test/:id",(req,res) => {

    let profilImage = req.files.picture;
    profilImage.mv(path.resolve(__dirname,"../public/img/profilImages",profilImage.name));

    Profil.findOne({_id:req.params.id}).then(users => {
        // let jsonUser = users.toJSON();
        // console.log(jsonUser.name + "\n" + req.body.name);
        users.name = req.body.name;
        users.tel = req.body.tel;
        users.mail = req.body.mail;
        users.password = req.body.password;
        users.address = req.body.address;
        users.picture = `/img/profilImages/${profilImage.name}`;
        users.save().then(user => {
            res.redirect("/");
        });
    });


});
 

module.exports = router;