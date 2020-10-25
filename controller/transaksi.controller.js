"use strict";

var response = require("../res");
var connection = require("../koneksi");

exports.index = function (req, res) {
  response.ok("Aplikasi REST API ku berjalan!", res);
};

exports.TampilTransaksiPemasukkan = function (req, res) {
  connection.query("SELECT transaksikas.noref, transaksikas.transaksikas_tanggal, transaksikas.transaksikas_nominal, bukukas.bukukas_nama as namakas, kategorikas.kategorikas_nama as kategorikas, transaksikas.transaksikas_tipe  FROM transaksikas INNER join bukukas on transaksikas.bukukas_id=bukukas.bukukas_id INNER JOIN kategorikas on transaksikas.kategorikas_id=kategorikas.kategorikas_id  WHERE transaksikas.transaksikas_tipe='pemasukkan'", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
exports.TampilTransaksiPengeluaran = function (req, res) {
          connection.query("SELECT transaksikas.noref, transaksikas.transaksikas_tanggal, transaksikas.transaksikas_nominal, bukukas.bukukas_nama as namakas, kategorikas.kategorikas_nama as kategorikas, transaksikas.transaksikas_tipe  FROM transaksikas INNER join bukukas on transaksikas.bukukas_id=bukukas.bukukas_id INNER JOIN kategorikas on transaksikas.kategorikas_id=kategorikas.kategorikas_id  WHERE transaksikas.transaksikas_tipe='pengeluaran'", function (error, rows, fileds) {
            if (error) {
              console.log(error);
            } else {
              response.ok(rows, res);
            }
          });
};
exports.RekapTransaksi = function (req, res) {
          connection.query("SELECT transaksikas.noref, transaksikas.transaksikas_tanggal, transaksikas.transaksikas_nominal, bukukas.bukukas_nama as namakas, kategorikas.kategorikas_nama as kategorikas, transaksikas.transaksikas_tipe  FROM transaksikas INNER join bukukas on transaksikas.bukukas_id=bukukas.bukukas_id INNER JOIN kategorikas on transaksikas.kategorikas_id=kategorikas.kategorikas_id", function (error, rows, fileds) {
            if (error) {
              console.log(error);
            } else {
              response.ok(rows, res);
            }
          });
        };

//menampilkan semua data user berdasarkan id
// exports.tampilberdasarkanid = function (req, res) {
//   let id = req.params.id;
//   connection.query("SELECT * FROM user WHERE user_id = ?", [id], function (
//     error,
//     rows,
//     fields
//   ) {
//     if (error) {
//       console.log(error);
//     } else {
//       response.ok(rows, res);
//     }
//   });
// };

//menambahkan data user
exports.tambahTransaksi = function (req, res) {
  // var id = req.body.user_id;
  // var nama = req.body.nama;
  // var username = req.body.username;
  // var password = req.body.password;
  var noref = req.body.noref;
  var transaksikas_tanggal = req.body.transaksikas_tanggal
  var transaksikas_nominal = req.body.transaksikas_nominal
  var bukukas_id = req.body.bukukas_id
  var kategorikas_id = req.body.kategorikas_id
  var transaksikas_tipe= req.body.transaksikas_tipe

  connection.query(
    "INSERT INTO transaksikas (noref,transaksikas_tanggal,transaksikas_nominal, bukukas_id, kategorikas_id, transaksikas_tipe) VALUES(?,?,?,?,?,?)",
    [noref,transaksikas_tanggal,transaksikas_nominal,bukukas_id,kategorikas_id,transaksikas_tipe],
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
exports.ubahTransaksi = function (req, res) {
  var noref = req.body.noref;
  var transaksikas_tanggal = req.body.transaksikas_tanggal
  var transaksikas_nominal = req.body.transaksikas_nominal
  var bukukas_id = req.body.bukukas_id
  var kategorikas_id = req.body.kategorikas_id
  var transaksikas_tipe= req.body.transaksikas_tipe

  connection.query(
    "UPDATE transaksikas SET transaksikas_tanggal=?, transaksikas_nominal=?, bukukas_id=?,kategorikas_id=?, transaksikas_tipe=? WHERE noref=?",
    [transaksikas_tanggal,transaksikas_nominal,bukukas_id,kategorikas_id,transaksikas_tipe,noref],
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
exports.hapusTransaksi = function (req, res) {
  var noref = req.body.noref;
  connection.query("DELETE FROM transaksikas WHERE noref=?", [noref], function (
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
