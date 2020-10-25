"use strict";

var response = require("../res");
var connection = require("../koneksi");




exports.SemuaJabatan = function (req, res) {
  connection.query("SELECT * from jabatan", function (error, rows, fileds) {
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
  connection.query("SELECT * from jabatan WHERE jabtan.id_jabatan=?", [id], function (
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
exports.tambahjabatan = function (req, res) {
         
  var id_jabatan = req.body.id_jabatan
  var nama_jabatan = req.body.nama_jabatan
  connection.query(
    "INSERT INTO jabatan (id_jabatan,nama_jabatan) VALUES(?,?)",
    [id_jabatan,nama_jabatan],
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
exports.ubahJabatan = function (req, res) {
  var id_jabatan = req.body.id_jabatan
  var nama_jabatan = req.body.nama_jabatan
  connection.query(
    "UPDATE jabatan SET nama_jabatan=? WHERE id_jabatan=?",
    [nama_jabatan,id_jabatan],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Ubah Data", res);
      }
    }
  );
};

