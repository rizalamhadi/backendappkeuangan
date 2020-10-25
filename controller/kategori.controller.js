"use strict";
var response = require("../res");
var connection = require("../koneksi");

exports.SemuaKategoriKas = function (req, res) {
  connection.query("SELECT * from kategorikas", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkan semua data user berdasarkan id


//menambahkan data user
exports.tambahkategorikas = function (req, res) {
  var kategorikas_id = req.body.kategorikas_id
  var kategorikas_nama = req.body.kategorikas_nama
  
  connection.query(
    "INSERT INTO kategorikas (kategorikas_id,kategorikas_nama) VALUES(?,?)",
    [kategorikas_id,kategorikas_nama],
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
exports.ubahKategori = function (req, res) {
          var kategorikas_id = req.body.kategorikas_id
          var kategorikas_nama = req.body.kategorikas_nama
  connection.query(
    "UPDATE kategorikas SET kategorikas_nama=? WHERE kategorikas_id=?",
    [kategorikas_nama,kategorikas_id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Ubah Data", res);
      }
    }
  );
};

