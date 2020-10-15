var connetion = require('../koneksi')
var mysql = require('mysql')
var md5 = require('md5')
var response = require('../res')
var jwt = require = ('jsonwebtoken')
var config = require('../config/secret')
var ip = require('ip')
const conn = require('../koneksi')

//controller untuk registrasi

exports.registrasi = function (req, res) {
          var userdata = {
                    id: req.body.user_id,
                    nama: req.body.nama,
                    username: req.body.username,
                    password: md5(req.body.password),
                    role: req.body.role
          }
          var query = "select username from ?? where ??"
          var table = ["user", "username", userdata.username]
          query = mysql.format(query, table)
          connetion.query(query, function (error, rows) {
                    if (error) {
                              console.log(error)
                    } else {
                              if (rows.length == 0) {
                                        var query = "insert into ?? set ??"
                                        var table = ["user"]
                                        query = mysql.format(query, table)
                                        connetion.query(query, userdata, function (error, rows) {
                                                  if (error) {
                                                            console.log(error)
                                                  } else {
                                                            response.ok("berhasil menambahkan data user baru", res)
                                                  }
                                        })
                              } else {
                                    response.ok("username sudah terdaftar")    
                              }
                    }
          })
}