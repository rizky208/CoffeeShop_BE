const productModel = require("../model/model-product");
const { unlink } = require("node:fs");

const productController = {
  get: (req, res) => {
    // req.params
    // req.query
    // req.body
    return productModel
      .get(req.query)
      .then((result) => {
        //next explore
        // return formResponse("succes", result, 200)
        // return formResponse({ message: "succes", data: result, status: 200 })
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getDetail: (req, res) => {
    return productModel
      .getDetail(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  add: (req, res) => {
    const request = {
      ...req.body,
      img: req.file.filename,
    };

    return productModel
      .add(request)
      .then((result) => {
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  update: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
      file: req.files,
    };
    return productModel
      .update(request)
      .then((result) => {
        for (let index = 0; index < result.oldImages.length; index++) {
          console.log(result.oldImage[index].filename);
          unlink(`uploads/${result.oldImages.filename}`, (err) => {
            console.log(`successfully deleted ${result.oldImages.filename}`);
          });
        }
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  //   remove: (req, res) => {
  //     return productModel
  //       .remove(req.params.id)
  //       .then((result) => {
  //         return res.status(200).send({ message: "success", data: result });
  //       })
  //       .catch((error) => {
  //         return res.status(500).send({ message: error });
  //       });
  //   },
  // };

  remove: (req, res) => {
    return productModel
      .remove(req.params.id)
      .then((result) => {
        unlink(`uploads/${result.filename}`, (err) => {
          if (err) throw err;
          console.log(`successfully deleted ${result.filename}`);
        });
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

// remove:(req, res)=> {
//   return productModel.remove(req.params.id)
//   .then((result)=> {
//       for (let index = 0; index < result.length; index++) {
//           unlink(`public/uploads/images/${result[index].filename}`, (err) => {
//               if (err) throw err;
//               console.log(`successfully deleted ${result[index].filename}`);
//           });
//       }
//       return res.status(201).send({ message: "succes deleted", data: result })
//   }).catch((error)=> {
//       return res.status(500).send({ message: error })
//   })
// },
// }

module.exports = productController;
