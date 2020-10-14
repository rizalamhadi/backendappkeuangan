'use strict';

module.exports = function (app) {
    var user = require('../controller/user.controller');

    app.route('/')
        .get(user.index);


}