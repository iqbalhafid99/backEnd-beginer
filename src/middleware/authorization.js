const response = require("../helper/respone");

module.exports = {
  isCustomer: (req, res, next) => {
    if (req.APP_DATA.tokenDecode.level === 1) {
      next();
    } else {
      response(400, null, "user tidak memiliki akses", res);
    }
  },
};
