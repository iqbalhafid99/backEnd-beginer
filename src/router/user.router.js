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
} = require("../controller/food.controller");
// path login
const {
  insertRegister,
  insertLogin,
  destroyUser,
  updateUser,
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
router.post("/register", validate(register), insertRegister);
// login
router.post("/login", insertLogin);
// choice food with name
router.post("/choice", insertFood);
// insert recipe
router.post("/insert", upload, insertRecipe);
// food list
router.get("/food", auth, isCustomer, listFood);
// food list pagination
router.get("/pagination", paginate);
// update recipe
router.put("/update/:id", updateRecipe);
// update recipe
router.put("/updateuser/:id", updateUser);
// delete recipe
router.delete("/destroy/:id", destroyRecipe);
// delete USER
router.delete("/login/:id", destroyUser);

// router redis
router.get("/v1/getFromRedis/:id", hitProduct, getByID);

// router.get("/list", list);
module.exports = router;
