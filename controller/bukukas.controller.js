"use strict";
var response = require("../res");
var connection = require("../koneksi");

exports.SemuaBukuKas = function (req, res) {
  connection.query("SELECT * from Bukukas", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkan semua data user berdasarkan id


//menambahkan data user
exports.tambahBukukas = function (req, res) {
  var bukukas_id = req.body.bukukas_id
  var bukukas_nama = req.body.bukukas_nama
  var bukukas_saldo = req.body.bukukas_saldo
  var bukukas_saldoawal= req.body.bukukas_saldoawal
  connection.query(
    "INSERT INTO bukukas (bukukas_id,bukukas_nama,bukukas_saldo, bukukas_saldo, Bukukas_saldoawal) VALUES(?,?,?,?)",
    [bukukas_id,bukukas_nama,bukukas_saldo,bukukas_saldoawal],
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
exports.ubahBukukas = function (req, res) {
  var bukukas_id = req.body.bukukas_id
  var bukukas_nama = req.body.bukukas_nama
  var bukukas_saldo = req.body.bukukas_saldo
  var bukukas_saldoawal= req.body.bukukas_saldoawal
  connection.query(
    "UPDATE bukukas SET bukukas_nama=?, bukukas_saldo=?, bukukas_saldoawal=? WHERE bukukas_id=?",
    [bukukas_nama,bukukas_saldo,bukukas_saldoawal,bukukas_id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Ubah Data", res);
      }
    }
  );
};

