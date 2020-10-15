"use strict";

module.exports = function (app) {
  var user = require("../controller/user.controller");
  var transaksi = require("../controller/transaksi.controller");
  //route user
  app.route("/").get(user.index);

  app.route("/user").get(user.TampilSemuaUser);

  app.route("/user/:id").get(user.tampilberdasarkanid);

  app.route("/user").post(user.tambahUser);

  app.route("/user").put(user.ubahUser);

  app.route("/user").delete(user.hapusUser);

  //route transaksi
  app.route("/transaksi/masuk").get(transaksi.TampilTransaksiPemasukkan);
  app.route("/transaksi/keluar").get(transaksi.TampilTransaksiPengeluaran);
  app.route("/transaksi").get(transaksi.TampilTransaksi);
};
