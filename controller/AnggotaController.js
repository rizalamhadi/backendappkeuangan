"use strict";

var response = require("../res");
var connection = require("../koneksi");




exports.SemuaAnggota = function (req, res) {
  connection.query("SELECT anggotatamir.id_anggota, anggotatamir.nama_anggota,anggotatamir.alamat_anggota, anggotatamir.nohp_anggota,anggotatamir.email_anggota, jabatan.nama_jabatan as jabatan from anggotatamir INNER JOIN jabatan on anggotatamir.id_jabatan=jabatan.id_jabatan", function (error, rows, fileds) {
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
  connection.query("SELECT anggotatamir.id_anggota, anggotatamir.nama_anggota, anggotatamir.nohp_anggota,anggotatamir.email_anggota, jabatan.nama_jabatan as jabatan from anggotatamir INNER JOIN jabatan on anggotatamir.id_jabatan=jabatan.id_jabatan WHERE anggotatamir.id_anggota=?", [id], function (
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
exports.tambahAnggota = function (req, res) {
          var id_anggota = req.body.id_anggota
          var nama_anggota = req.body.nama_anggota
          var alamat_anggota = req.body.alamat_anggota
          var nohp_anggota = req.body.nohp_anggota
          var email_anggota = req.body.email_anggota
          var id_jabatan = req.body.id_jabatan
  connection.query(
    "INSERT INTO anggotatamir (id_anggota,nama_anggota, alamat_anggota, nohp_anggota, email_anggota, id_jabatan) VALUES(?,?,?,?,?,?)",
    [id_anggota,nama_anggota,alamat_anggota,nohp_anggota,email_anggota,id_jabatan],
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
exports.ubahAnggota = function (req, res) {
          var id_anggota = req.body.id_anggota
          var nama_anggota = req.body.nama_anggota
          var alamat_anggota = req.body.alamat_anggota
          var nohp_anggota = req.body.nohp_anggota
          var email_anggota = req.body.email_anggota
          var id_jabatan = req.body.id_jabatan
  connection.query(
    "UPDATE anggotatamir SET nama_anggota=?, alamat_anggota=?, nohp_anggota=?,email_anggota=?,id_jabatan=? WHERE id_anggota=?",
    [nama_anggota,alamat_anggota,nohp_anggota,email_anggota,id_jabatan,id_anggota],
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
exports.hapusAnggota = function (req, res) {
  var id = req.body.id_anggota;
  connection.query("DELETE FROM anggotatamir WHERE id_anggota=?", [id], function (
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
