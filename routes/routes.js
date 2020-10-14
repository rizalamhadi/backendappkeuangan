"use strict";

module.exports = function (app) {
  var user = require("../controller/user.controller");

  app.route("/").get(user.index);

  app.route("/user").get(user.TampilSemuaUser);

  app.route("/user/:id").get(user.tampilberdasarkanid);

  app.route("/user").post(user.tambahUser);

  app.route("/user").put(user.ubahUser);

  app.route("/user").delete(user.hapusUser);
};
