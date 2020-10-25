var connection = require("../koneksi");
var mysql = require("mysql");
var md5 = require("md5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

//controller untuk registrasi

exports.registrasi = function (req, res) {
  var userdata = {
    user_id: req.body.user_id,
    nama: req.body.nama,
    username: req.body.username,
    password: md5(req.body.password),
    role: req.body.role,
    createdat: new Date(),
  };
  var query = "select username from ?? where ??=?";
  var table = ["user", "username", userdata.username];
  query = mysql.format(query, table);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        var query = "insert into ?? set ?";
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, userdata, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            response.ok("berhasil menambahkan data user baru", res);
          }
        });
      } else {
        response.ok("username sudah terdaftar", res);
      }
    }
  });
};

exports.login = function (req, res) {
  var userdata = {
    password: req.body.password,
    username: req.body.username,
  };

  var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  var table = [
    "user",
    "password",
    md5(userdata.password),
    "username",
    userdata.username,
  ];

  query = mysql.format(query, table);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, {
          expiresIn: 1440,
        });
        (user_id = rows[0].user_id);
         
     
        var data = {
          user_id: user_id,
          akses_token: token,
          ip_address: ip.address(),
        };
        var query = "insert into ?? set ?";
        var table = ["akses_token"];

        query = mysql.format(query, table);
        connection.query(query, data, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "token jwt tergenerate",
              token: token,
              userid: data.user_id,
             
            });
          }
        });
      } else {
        res.json({
          erorr: true,
          message: "Username atau passwordnya salah",
        });
      }
    }
  });
};
