const connection = require("../config");
const format = require("dateformat");

const fs = require("fs");
const path = require("path");
const qr = require("qrious");

// const qrcode = require('qrcode')

// const PDFDocument = require("../pdfkit-table");

// const PDFDocument = require('pdfkit');
// const doc = new PDFDocument;

exports.get_All_User = (req, res) => {
  let sql = "SELECT UserId,nama,Username,Password,isadmin FROM user";

  connection.query(sql, (error, results) => {
    if (error) {
      var data = {
        status: false,
        message: error.message,
      };

      return res.status(500).json(data);
    } else {
      if (results.length > 0) {
        var data = {
          status: true,
          users: results,
        };
        return res.status(200).json(data);
      } else {
        var data = {
          status: false,
          message: "no data found",
        };

        return res.status(404).json(data);
      }
    }
  });
};

exports.get_User_ById = (req, res) => {
  const UserId = req.params.UserId;

  let sql =
    "SELECT UserId,nama,Username,Password,isadmin FROM user where UserId = ?";

  connection.query(sql, UserId, (error, results) => {
    if (error) {
      var data = {
        status: false,
        message: error.message,
      };

      return res.status(700).json(data);
    } else {
      
        var data = {
          status: true,
          message: "berhasil update user",
        };

        return res.status(404).json(data);
      
    }
  });
};

exports.signup = (req, res, next) => {
  nama = req.body.nama;
  username = req.body.username;
  password = req.body.password;
  IsAdmin = req.body.IsAdmin;
  permission = req.body.Permission;

  // console.log(permission.length)

  // Check Username Taken or not

  connection.query(
    "SELECT * FROM user WHERE Username = ?",
    [username],
    function (error, results, fields) {
      if (error) {
        var err = {
          status: false,
          message: error.message,
        };
        return res.status(500).json(err);
      } else {
        if (results.length > 0) {
          var data = {
            status: false,
            message: "Username already taken",
          };

          return res.status(401).json(data);
        } else {
          // Insert User

          var Insertsql =
            "insert into user(nama,Username,Password,IsAdmin) values(?,?,?,?)";

          connection.query(
            Insertsql,
            [nama, username, password, IsAdmin],
            function (userError, result) {
              if (userError) {
                var data = {
                  status: false,
                  message: userError.message,
                };

                return res.status(500).json(data);
              } else {
                
                  var data = {
                    status: true,
                    message: "berhasil menambahkan user",
                  };

                  return res.status(500).json(data);
                }
              }
            
          );
        }
      }
    }
  );
};

function insertPermission(userId) {
  connection.query("select * from modul", (error, result) => {
    var sql = "insert into permission(Modul_Id,UserId,akses) values(?,?,?)";

    for (var i = 0; i < result.length; i++) {
      connection.query(
        sql,
        [result[i].Modul_Id, parseInt(userId), 0],
        (err, results) => {
          if (err) {
            var errSql = {
              status: false,
              message: error.message,
            };
            return res.status(500).json(errSql);
          }
        }
      );
    }
  });
}

exports.update_UserAndPermission = (req, res, next) => {
  userId = req.body.userid;
  username = req.body.username;
  password = req.body.password;
  IsAdmin = req.body.IsAdmin;
  permission = req.body.Permission;

  var UserSql = "SELECT * FROM user WHERE Username = ? AND UserId NOT IN (?)";

  connection.query(UserSql, [username, userId], (userError, userresult) => {
    if (userError) {
      var data = {
        status: false,
        message: userError.message,
      };

      return res.status(500).json(data);
    } else {
      if (userresult.length > 0) {
        var data = {
          status: false,
          message: "Username already taken",
        };

        return res.status(401).json(data);
      } else {
        // Update User Details

        var UpdateUserSql =
          "UPDATE user SET Username = ?, Password = ?, isadmin = ? WHERE UserId = ?";
        var UpdataeUserData = [username, password, IsAdmin, userId];

        connection.query(
          UpdateUserSql,
          UpdataeUserData,
          (userUpdateError, userUpdateResult) => {
            if (userUpdateError) {
              var data = {
                status: false,
                message: userUpdateError.message,
              };

              return res.status(500).json(data);
            } else {
              // update permission

              var updatePermission = "UPDATE permission SET akes = (CASE";

              if (permission.length > 0) {
                for (var i = 0; i < permission.length; i++) {
                  updatePermission +=
                    " WHEN Modul_Id = " +
                    permission[i].Modul_Id +
                    " THEN " +
                    permission[i].akses;
                }

                updatePermission += " END) WHERE UserId = " + userId;

                connection.query(
                  updatePermission,
                  (permissionError, permissionResult) => {
                    if (permissionError) {
                      var data = {
                        status: false,
                        message: permissionError.message,
                      };

                      return res.status(500).json(data);
                    } else {
                      var data = {
                        status: true,
                        message: "Record Updated",
                      };

                      return res.status(200).json(data);
                    }
                  }
                );
              } else {
                var data = {
                  status: false,
                  message: "Something went wrong! Please try again later",
                };

                return res.status(500).json(data);
              }
            }
          }
        );
      }
    }
  });
};

exports.delete_User_ById = (req, res, next) => {
  userId = req.params.UserId;

  var sql = "DELETE FROM user WHERE UserId = ?";

  connection.query(sql, userId, (error, results) => {
    if (error) {
      var data = {
        status: false,
        message: error.message,
      };

      return res.status(500).json(data);
    } else {
      if (results.affectedRows > 0) {
        var data = {
          status: true,
          message: "Record Deleted",
        };

        return res.status(200).json(data);
      } else {
        var data = {
          status: false,
          message: "No data found",
        };

        return res.status(404).json(data);
      }
    }
  });
};

// exports.create_PDF = (req,res) => {

//     let itemsid = [1,2,30];

//     let sql = "SELECT * FROM itemmastertbl WHERE ItemId IN (" + itemsid + ")";

//     connection.query(sql, (error,results) => {
//         if(error)
//         {
//             var data = {
//                 "status": false,
//                 "message": error.message
//             };
//             return res.status(500).json(data);
//         }
//         else
//         {
//             if(results.length > 0)
//             {

//                 var data = {
//                     itemid:"1",
//                     description:"a"
//                 }

//

//             }
//             else
//             {
//                 var data = {
//                     "status": false,
//                     "message": "No data found"
//                 };
//                 return res.status(404).json(data);
//             }
//         }
//     });

// };

// let tDate = new Date();
//                 let todayDate = format(tDate,'yyyymmddhhMMss');
//                 let fileName = "Items_" + todayDate;

//                 let filePath = path.join(path.dirname(require.main.filename),"PDF",  fileName + ".pdf");

//                 console.log(filePath);

//                 doc.pipe(fs.createWriteStream(filePath));

//                 const table = {
//                     headers: ["ItemCode", "Description", "Unit", "Inventory", "ActualCost", "TotalValue","QR Code"],
//                     rows: []
//                 };

//                 // Add the patients to the table
//                 for (const result of results) {
//                     const qrCodeImage = qrcode.toDataURL("hi", () => {})
//                     table.rows.push([result.ItemCode,result.Description,result.Unit,result.Inventory,result.ActualCost,result.TotalValue,qrCodeImage])
//                 }

//                 // Draw the table
//                 doc.moveDown().table(table, 10, 125, { width: 590 });

//                 // Finalize the PDF and end the stream
//                 doc.end();
