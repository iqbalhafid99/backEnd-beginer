const express = require("express");
const router = express.Router();
// path resep
const {
  listFood,
  insertFood,
  insertRecipe,
  updateRecipe,
  destroyRecipe,
} = require("../controller/food.controller");
// path login
const {
  insertRegister,
  insertLogin,
  destroyUser,
  updateUser,
} = require("../controller/user.controller");
// register
router.post("/register", insertRegister);
// login
router.post("/login", insertLogin);
// choice food with name
router.post("/choice", insertFood);
// insert recipe
router.post("/insert", insertRecipe);
// food list
router.get("/food", listFood);
// update recipe
router.put("/update/:id", updateRecipe);
// update recipe
router.put("/updateuser/:id", updateUser);
// delete recipe
router.delete("/destroy/:id", destroyRecipe);
// delete USER
router.delete("/login/:id", destroyUser);

// router.get("/list", list);
module.exports = router;
