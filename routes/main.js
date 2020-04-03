const express = require("express");
const router = express.Router();

const Profil = require("../models/Profil");

router.get("/",(req,res) => {
    Profil.findById(res.locals.sessionId).then(user => {
        if(user)
        {
            let jsonUser = user.toJSON();
            res.render("site/index",{user:jsonUser});
        }
        else
        {
            res.render("site/index");
        }
    });
});


module.exports = router;