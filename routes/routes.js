var user = require("../controller/user.controller");
var transaksi = require("../controller/transaksi.controller");
var express = require("express");
var auth = require("../middleware/auth");
var router = express.Router();
var verifikasi = require("../middleware/verifikasi");

//daftarkan menu registrasi
router.post("/user/register", auth.registrasi);
router.post("/user/login", auth.login);
router.get("/", user.index);
router.get("/user", verifikasi(1), user.TampilSemuaUser);
router.get("/user/:userid", verifikasi(), user.tampilberdasarkanid);
router.post("/user", verifikasi(), user.tambahUser);
router.put("/user", verifikasi(), user.ubahUser);
router.delete("/user", verifikasi(), user.hapusUser);
//route transaksi
router.get(
  "/transaksi/masuk",
  verifikasi(),
  transaksi.TampilTransaksiPemasukkan
);
router.get(
  "/transaksi/keluar",
  verifikasi(),
  transaksi.TampilTransaksiPengeluaran
);
router.get("/transaksi", verifikasi(), transaksi.TampilTransaksi);

module.exports = router;
