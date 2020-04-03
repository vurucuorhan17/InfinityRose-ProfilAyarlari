const express = require("express");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const connectMongo = require("connect-mongo");
const path = require("path");
const methodOverride = require("method-override");
const mongoStore = connectMongo(expressSession);

const app = express();

app.engine("handlebars",exphbs());
app.set("view engine","handlebars");

mongoose.connect("mongodb://127.0.0.1/infinityrose_db",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});


app.use(expressSession({
    secret:"test",
    resave:false,
    saveUninitialized: true,
    store: new mongoStore({mongooseConnection:mongoose.connection})
}));

app.use((req,res,next) => {
    const {userId} = req.session;
    
    if (userId)
    {
        res.locals = {
            displayTrue: true
        }
    }
    else
    {
        res.locals = {
            displayTrue: false
        }
    }
    next();
});

app.use((req,res,next) => {
    
    res.locals.sessionId = req.session.userId;
    next();

});

app.use((req,res,next) => {
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

app.use(fileUpload());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(methodOverride("_method"));

const hostname = "127.0.0.1";
const port = 8080;

app.use(express.static("public"));

const main = require("./routes/main");
const profil = require("./routes/profil");
const users = require("./routes/users");

app.use("/",main);
app.use("/profil",profil);
app.use("/users",users);

app.listen(port,hostname,() => console.log(`Server Dinleniyor: http://${hostname}:${port}`));

