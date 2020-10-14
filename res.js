"use strict";

exports.ok = function (values, res) {
  var data = {
    status: 200,
    values: values,
  };

  console.log(values);
  res.json(data);
  res.end();
};

// exports.oknested = function (values, res) {
//           //lakukan akumulasi
//           const hasil = values.reduce((akumulasikan, item) => {
//                     if (akumulasikan[item.transaksikas]) {
//                               const group = akumulasikan[item.bukukas]
//                               if (Array.isArray(group.bukukas)) {
//                                    group.bukukas.push(item.bukukas)     
//                               } else {
//                                         group.transaksikas = [group.transaksikas, item.transaksikas]
//                               }
                  
                             
//                     } else {
//                               akumulasikan[item.bukukas]= item
//                     }    
//                     return akumulasikan
//           }, {}) 
          
//           var data = {
//                     'status': 200,
//                     'values':hasil
//           }
//           res.json(data);
//           res.end()
// }
