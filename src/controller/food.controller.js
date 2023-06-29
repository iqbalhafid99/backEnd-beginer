const foodModel = require("../model/food.model");
const response = require("../helper/respone");
const client = require("../config/redis");
const { json } = require("body-parser");
const fs = require("fs-extra");
const jwt = require("jsonwebtoken");

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
    const { video, nama_resep, resep } = req.body;
    const image = req.file.filename;
    console.log(image);
    const cookie = req.headers.cookie;
    const token = cookie.replace("token=", "");
    const decodedToken = jwt.verify(token, "contoh123");
    const user_id = decodedToken.id;
    const data = {
      user_id,
      video,
      nama_resep,
      resep,
      image,
    };
    foodModel
      .insertRecipe(data)
      .then((result) => {
        console.log(image);
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

  paginate: async (req, res) => {
    const { limit, page, sort } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 5;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

    try {
      const foods = await foodModel.paginate(limitValue, offsetValue, sort);
      const pagination = {
        currentPage: pageValue,
        dataPerPage: limitValue,
      };
      res.status(200).json({
        foods,
        pagination,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to fetch foods",
      });
    }
  },

  // Redis
  // getByID: (req, res) => {
  //   const id = req.params.id;
  //   foodModel
  //     .selectByID(id)
  //     .then((result) => {
  //       const dataRedis = client.set(
  //         `getFromRedis/${id}`,
  //         JSON.stringify(result),
  //         {
  //           EX: 180,
  //           NX: true,
  //         }
  //       );
  //       res.send({
  //         fromCache: false,
  //         data: dataRedis,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },

  // get by id
  getByID: (req, res) => {
    const id = req.params.id;
    foodModel
      .selectByID(id)
      .then((result) => {
        console.log(result);
        response(200, result.rows, "Food List!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // search food
  searchFood: (req, res) => {
    const { query } = req.query;
    const searchQuery = `%${query.toLowerCase()}%`;

    foodModel
      .searchFood(searchQuery)
      .then((result) => {
        response(200, result.rows, "Search Results!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // sorting food by asc or desc
  sortFood: (req, res) => {
    let { sort } = req.query;
    sort = sort === "desc" ? "DESC" : "ASC"; // Menentukan urutan default jika sort tidak valid

    const columnName = "nama_resep";

    foodModel
      .sortFood(columnName, sort)
      .then((result) => {
        response(200, result.rows, "Sorted Food List!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getRecipesWithUser: (req, res) => {
    const cookie = req.headers.cookie;
    const token = cookie.replace("token=", "");
    const decodedToken = jwt.verify(token, "contoh123");
    const user_id = decodedToken.id;
    foodModel
      .getRecipesWithUser(user_id)
      .then((result) => {
        response(
          200,
          result.rows,
          "Recipes with User retrieved successfully!",
          res
        );
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
module.exports = foodController;
