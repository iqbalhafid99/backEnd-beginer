require("dotenv").config();
const jwt = require("jsonwebtoken");
const dataToken = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers;
    const decode = jwt.verify(token, dataToken);

    req.APP_DATA = {
      tokenDecode: decode,
    };
    console.log(req.APP_DATA);
    next();
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
