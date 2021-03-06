const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");

const Profil = require("../models/Profil");

router.get("/login",(req,res) => {
    res.render("site/login");
});

router.post("/login",(req,res) => {

    const {mail,password} = req.body;
    Profil.findOne({mail},(err,user) => {
        if(user)
        {

            bcrypt.compare(password,user.password,(err,result)=> {
                if(result)
                {
                    req.session.userId = user._id;
                    res.redirect("/");
                }
                else
                {
                    res.redirect("/users/login")
                }

            });

            // if(user.password === password)
            // {
            //     req.session.userId = user._id;
            //     res.redirect("/");
            
            // }
            // else
            // {
            //     res.redirect("/users/login");
            // }
        }
        else
        {
            res.redirect("/users/login");
        }
    });

});

router.get("/logout",(req,res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});


router.get("/register",(req,res) => {
    res.render("site/register");
});


router.post("/register",(req,res) => {

    let profileImage = req.files.picture;
    profileImage.mv(path.resolve(__dirname,"../public/img/profilImages",profileImage.name));

    bcrypt.hash(req.body.password,10,(err,hash) => {
        Profil.create({
            "name":req.body.name,
            "tel":req.body.tel,
            "mail":req.body.mail,
            "password":hash,
            "address":req.body.address,
            picture: `/img/profilImages/${profileImage.name}`,

        });
    })
    res.redirect("/"); 

});

module.exports = router;