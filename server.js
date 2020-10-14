const express = require("express");
const bodyParser = require("body-parser");

//var morgan = require('morgan');
const app = express();
//var cors = require('cors');

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan('dev'));
// app.use(cors());

//panggil routes
var routes = require("./routes/routes");
routes(app);

//daftarkan menu routes dari index
//app.use('/auth', require('./middleware'));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
