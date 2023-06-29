const express = require("express");
const router = express.Router();
// path resep
const {
  listFood,
  insertFood,
  insertRecipe,
  updateRecipe,
  destroyRecipe,
  paginate,
  getByID,
  getRecipesWithUser,
  searchFood,
  sortFood,
} = require("../controller/food.controller");
// path login
const {
  insertRegister,
  insertLogin,
  destroyUser,
  updateUser,
  listUser,
  addPhoto,
  getUserFromToken,
} = require("../controller/user.controller");

// path redis
const { hitProduct } = require("../middleware/redis");
// middleware joi
const { register } = require("../helper/joi");
const { validate } = require("../middleware/joiValidation");

// middleware jwt
const auth = require("../middleware/staticAuth");
// authorization
const { isCustomer } = require("../middleware/authorization");

// multer || upload gambar
const upload = require("../middleware/upload");

// register
router.post("/register", insertRegister);
// login
router.post("/login", insertLogin);
// choice food with name
router.post("/choice", insertFood);
// insert recipe
router.post("/insert", upload, insertRecipe);
// food list
router.get("/food", listFood);
// food list
router.get("/user", listUser);
// food list pagination
router.get("/pagination", paginate);
// update recipe
router.put("/update/:id", updateRecipe);
// update recipe
router.put("/updateuser/:id", updateUser);
// ganti photo profile
router.put("/add-photo/:id", upload, addPhoto);
// delete recipe
router.delete("/destroy/:id", destroyRecipe);
// delete USER
router.delete("/login/:id", destroyUser);
// search food
router.get("/foods/search", searchFood);
// sorting food ascending or descending
router.get("/foods/sort", sortFood);
// get food by id
router.get("/food-user", getRecipesWithUser);
// get food by id
router.get("/food/:id", getByID);
// get credentials with token
router.get("/credential", getUserFromToken);

// router.get("/list", list);
module.exports = router;
