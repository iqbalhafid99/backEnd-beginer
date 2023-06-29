const userModel = require("../model/user.model");
const response = require("../helper/respone");
const bcrypt = require("bcrypt");
const jwtToken = require("../helper/generateSecret");
const jwt = require("jsonwebtoken");
const dataToken = process.env.JWT_SECRET;

// INSERT REGISTER
const userController = {
  insertRegister: async (req, res) => {
    const { name, email, phone, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      const data = {
        name,
        email,
        phone,
        password: hash,
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

  // GET ALL USER

  listUser: (req, res) => {
    userModel
      .selectAll()
      .then((result) => {
        response(200, result.rows, "List All user", res);
      })
      .catch((err) => {
        console.log(err);
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
        const userAuth = result.rows[0].id;
        const emailAuth = result.rows[0].email;
        const nameAuth = result.rows[0].name;
        const imageAuth = result.rows[0].image;
        if (result.rowCount > 0) {
          bcrypt
            .compare(password, result.rows[0].password)
            .then(async (result) => {
              if (result === true) {
                const user = await userModel.loginUser({ email, password });
                const token = await jwtToken({
                  email: emailAuth,
                  id: userAuth,
                  name: nameAuth,
                  image: imageAuth,
                });
                return res
                  .status(200)
                  .cookie("token", token, { httpOnly: true })
                  .json({
                    success: true,
                    message: "login successful",
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

  // get credentials user profile
  getUserFromToken: async (req, res) => {
    try {
      const token = req.cookies.token;

      const decoded = jwt.verify(token, dataToken);

      const userId = decoded.id;
      const name = decoded.name;
      const image = decoded.image;

      return res.status(200).json({
        success: true,
        message: "sukses mendapatkan data",
        userId,
        name,
        image,
      });
    } catch (err) {
      console.log(err);
      response(400, 0, err, res);
    }
  },

  addPhoto: (req, res) => {
    const image = req.file.filename;
    const id = req.params.id;
    const data = {
      id,
      image,
    };
    userModel
      .addPhoto(data)
      .then((result) => {
        response(200, result.rowCount, "berhasil menambahkan photo", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
module.exports = userController;
