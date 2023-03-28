const userModel = require("../model/user.model");
const response = require("../controller/helper");

// INSERT REGISTER
const userController = {
  insertRegister: (req, res) => {
    const { id, name, email, phone, password } = req.body;
    const data = {
      id,
      name,
      email,
      phone,
      password,
    };
    userModel
      .registerUser(data)
      .then((result) => {
        response(200, result.rowCount, "register berhasil!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // INSERT LOGIN
  insertLogin: (req, res) => {
    const { email, password } = req.body;
    const data = {
      email,
      password,
    };
    userModel
      .loginUser(data)
      .then((result) => {
        response(200, result.rows, "Login berhasil!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // delete user
  destroyUser: (req, res) => {
    const id = req.params.id;
    userModel
      .destroyUser(id)
      .then((result) => {
        response(200, result.rowCount, "User Deleted", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // update user
  updateUser: (req, res) => {
    const id = req.params.id;
    const { name, email, phone, password } = req.body;
    const data = {
      id,
      name,
      email,
      phone,
      password,
    };
    userModel
      .update(data)
      .then((result) => {
        response(200, result.rowCount, "User Succesfully update", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
module.exports = userController;
