const userModel = require("../model/user.model");
const response = require("../helper/respone");
const bcrypt = require("bcrypt");
const jwtTOken = require("../helper/generateSecret");

// INSERT REGISTER
const userController = {
  insertRegister: async (req, res) => {
    const { id, name, email, phone, password, level } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      const data = {
        id,
        name,
        email,
        phone,
        password: hash,
        level,
      };
      userModel
        .registerUser(data)
        .then((result) => {
          response(200, result.rowCount, "register berhasil!", res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  // INSERT LOGIN
  insertLogin: async (req, res) => {
    const { email, password } = req.body;
    const data = {
      email,
      password,
    };
    userModel
      .loginUser(data)
      .then((result) => {
        const userAuth = result.rows[0].level;
        console.log(userAuth);
        if (result.rowCount > 0) {
          bcrypt
            .compare(password, result.rows[0].password)
            .then(async (result) => {
              if (result === true) {
                const token = await jwtTOken({
                  username: result.rows,
                  level: userAuth,
                });
                res.json({
                  message: "berhasil login",
                  token,
                });
              } else {
                response(400, result.rowCount, "Password salah", res);
              }
            });
        } else {
          response(400, result.rowCount, "email atau username salah", res);
        }
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
