const multer = require("multer");
const path = require("path");

// management file

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `/${Date.now()}${ext}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === ".jpg" || ext === ".png") {
      cb(null, true);
    } else {
      const error = {
        message: "gambar harus png atau jpg",
      };
      cb(error, false);
    }
  },
});

const upload = (req, res, next) => {
  const multerSingle = multerUpload.single("image");
  multerSingle(req, res, (err) => {
    if (err) {
      res.json({
        message: "error when upload file",
        err,
      });
    } else {
      next();
    }
  });
};

module.exports = upload;
