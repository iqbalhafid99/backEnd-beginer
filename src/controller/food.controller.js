const foodModel = require("../model/food.model");
const response = require("../helper/respone");
const client = require("../config/redis");
const { json } = require("body-parser");
const fs = require("fs-extra");

// Food list
const foodController = {
  listFood: (req, res) => {
    foodModel
      .selectAll()
      .then((result) => {
        response(200, result.rows, "Food List!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // food choice
  insertFood: (req, res) => {
    const { nama_resep } = req.body;
    const data = {
      nama_resep,
    };
    foodModel
      .foodChoice(data)
      .then((result) => {
        response(200, result.rows, "Recipe choice!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  //   new recipe
  insertRecipe: (req, res) => {
    const { id, video, nama_resep, resep } = req.body;
    const image = req.file.path;
    const data = {
      id,
      video,
      nama_resep,
      resep,
      image,
    };
    foodModel
      .insertRecipe(data)
      .then((result) => {
        response(200, result.rowCount, "Recipe succsess added!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  //   update recipe
  updateRecipe: (req, res) => {
    const id = req.params.id;
    const { video, nama_resep, resep } = req.body;
    const data = {
      id,
      video,
      nama_resep,
      resep,
    };
    foodModel
      .updateData(data)
      .then((result) => {
        response(200, result.rowCount, "Recipe succsessfully added!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  //   delete recipe
  destroyRecipe: (req, res) => {
    const id = req.params.id;
    fs.unlinkSync(`./public/${id}`);
    foodModel
      .destroyData(id)
      .then((result) => {
        response(200, result.rowCount, "Recipe Deleted", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // delete image

  // destroyImage: (req, res) => {
  //   const id = req.params.id;
  //   fs.unlinkSync(`./public/${id}`)
  //   foodModel
  //     .destroyData(id)
  //     .then((result) => {
  //       response(200, result.rowCount, "Recipe Deleted", res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },

  paginate: (req, res) => {
    const { limit, page } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 2;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

    foodModel
      .paginate(limitValue, offsetValue)
      .then((result) => {
        const pagination = {
          cuurentPage: pageValue,
          dataperPage: limitValue,
        };

        response(200, result.rows, "Recipe List!", res);
        // res.send(pagination);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getByID: (req, res) => {
    const id = req.params.id;
    foodModel
      .selectByID(id)
      .then((result) => {
        const dataRedis = client.set(
          `getFromRedis/${id}`,
          JSON.stringify(result),
          {
            EX: 180,
            NX: true,
          }
        );
        res.send({
          fromCache: false,
          data: dataRedis,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
module.exports = foodController;
