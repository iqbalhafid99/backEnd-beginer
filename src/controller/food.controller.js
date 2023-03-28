const foodModel = require("../model/food.model");
const response = require("../controller/helper");

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
    const { id, gambar, nama_resep, resep } = req.body;
    const data = {
      id,
      gambar,
      nama_resep,
      resep,
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
    const { gambar, nama_resep, resep } = req.body;
    const data = {
      id,
      gambar,
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
    foodModel
      .destroyData(id)
      .then((result) => {
        response(200, result.rowCount, "Recipe Deleted", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
module.exports = foodController;
