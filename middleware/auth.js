var connection = require("./../config");
const jwt = require("jsonwebtoken");
const { query } = require("express");

// jwt key and expriry time of token
const jwtKey = "butyful-app";
const jwtExpirySeconds = 86400;

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
        if (results.length > 0) {
          connection.query(
            "Select m.Modul,p.akses from user u,permission p,modul m where Username = ? and Password = ? and u.UserId = p.UserId and p.modul_id = m.modul_id",
            [username, password],
            (errorData, ResultSet, fielddata) => {
              const token = jwt.sign({ username }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
              });

              var data = {
                status: true,
                _token: token,
                UserId: results[0].UserId,
                nama: results[0].nama,
                Username: results[0].username,

                isAdmin: results[0].IsAdmin,
                Permission: ResultSet,
                message: "Authenticated Successfully",
              };

              req.session.token = token;
              req.session.username = username;

              return res.status(200).json(data);
            }
          );
        } else {
          var data = {
            status: false,
            message: "Email or Password does not match",
          };
          return res.status(401).json(data);
        }
      }
    }
  );
};

const welcome = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    var data = {
      status: false,
      message: "You need to login first...",
    };
    return res.status(500).json(data);
  } else {
    if (token.startsWith("Bearer ")) {
      var payload;
      try {
        token = token.split(" ")[1];
        payload = jwt.verify(token, jwtKey);

<<<<<<< HEAD
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
         
     
=======
        next();
      } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
          var data = {
            status: false,
            message: "Login Again...",
          };
          return res.status(500).json(data);
        }
>>>>>>> 1cb0f5b1bdb69957135426ba41e75cdd4c70f659
        var data = {
          status: false,
          message: "Login Again...",
        };
        return res.status(500).json(data);
      }
    } else {
      return res.status(401).json({
        status: false,
        message: "invalid token payload or token is expired",
      });
    }
  }
};

const getPlayload = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  var payload;
  if (token === undefined) {
    return res.json({
      status: false,
      message: "forbidden",
    });
  } else {
    if (token.startsWith("Bearer ")) {
      var payload;
      try {
        token = token.split(" ")[1];
        payload = jwt.verify(token, jwtKey);
      } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
          console.log(e);
          return res.json({
            message: e.message,
            status: false,
          });
        }
      }

      if (payload !== undefined) {
        connection.query(
          "SELECT * FROM user WHERE Username = ?",
          [payload.username],
          function (error, results, fields) {
            if (error) {
              console.log(error);
              var err = {
                status: false,
                message: error.message,
              };
              return res.status(500).json(data);
            } else {
              connection.query(
                "Select m.Modul,p.akses from user u,permission p,modul m where Username = ? and u.UserId = p.UserId and p.modul_id = m.modul_id",
                [payload.username],
                (errorData, ResultSet, fielddata) => {
                  var data = {
                    status: true,
                    _token: token,
                    UserId: results[0].UserId,
                    nama: results[0].nama,
                    Username: results[0].username,

<<<<<<< HEAD
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
=======
                    isAdmin: results[0].IsAdmin,
                    Permission: ResultSet,
                    message: "Authenticated Successfully",
                  };

                  return res.status(200).json(data);
                }
              );
            }
>>>>>>> 1cb0f5b1bdb69957135426ba41e75cdd4c70f659
          }
        );
      } else {
<<<<<<< HEAD
        res.json({
          erorr: true,
          message: "Username atau passwordnya salah",
=======
        return res.status(401).json({
          status: false,
          message: "invalid token payload or token is expired",
>>>>>>> 1cb0f5b1bdb69957135426ba41e75cdd4c70f659
        });
      }
    } else {
      return res.status(401).json({
        status: false,
        message: "invalid token payload or token is expired",
      });
    }
  }
};
<<<<<<< HEAD
=======

module.exports = {
  signIn,
  welcome,
  getPlayload,
};
>>>>>>> 1cb0f5b1bdb69957135426ba41e75cdd4c70f659
