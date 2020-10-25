const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// modules
const config = require('./config');
const UserRoutes = require('./routes/UserRoutes')

const { signIn, welcome, getPlayload } = require('./middleware/Auth');

const port = process.env.PORT;


app.use(cookieParser());
app.use(session({
    secret: "Shh, its a secret!",
    saveUninitialized: true,
    resave: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.send("Api Start.......")
})

//Authentication Route

app.post('/auth/login',signIn);

app.get('/auth/playload',getPlayload);

// User ROuter
app.use('/user',UserRoutes);

//panggil routes
// var routes = require("./routes/routes");
// routes(app);

//daftarkan menu routes dari index
app.use('/api', require('./routes/routes'));

app.listen(port,() => {
    console.log(`Server is running on https://localhost:${port}/`);
})
