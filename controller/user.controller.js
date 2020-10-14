"use strict";

var response = require("../res");
var connection = require("../koneksi");

exports.index = function (req, res) {
  response.ok("Aplikasi REST API ku berjalan!", res);
};

exports.TampilSemuaUser = function (req, res) {
  connection.query("SELECT * FROM user", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkan semua data user berdasarkan id
exports.tampilberdasarkanid = function (req, res) {
  let id = req.params.id;
  connection.query("SELECT * FROM user WHERE user_id = ?", [id], function (
    error,
    rows,
    fields
  ) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menambahkan data user
exports.tambahUser = function (req, res) {
  var id = req.body.user_id;
  var nama = req.body.nama;
  var username = req.body.username;
  var password = req.body.password;

  connection.query(
    "INSERT INTO user (user_id, nama, username, password) VALUES(?,?,?,?)",
    [id, nama, username, password],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data!", res);
      }
    }
  );
};

//mengubah data berdasarkan id
exports.ubahUser = function (req, res) {
  var id = req.body.user_id;
  var nama = req.body.nama;
  var username = req.body.username;
  var password = req.body.password;

  connection.query(
    "UPDATE user SET nama=?, username=?, password=? WHERE user_id=?",
    [nama, username, password, id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Ubah Data", res);
      }
    }
  );
};

//Menghapus data berdasarkan id
exports.hapusUser = function (req, res) {
  var id = req.body.user_id;
  connection.query("DELETE FROM user WHERE user_id=?", [id], function (
    error,
    rows,
    fields
  ) {
    if (error) {
      console.log(error);
    } else {
      response.ok("Berhasil Hapus Data", res);
    }
  });
};
