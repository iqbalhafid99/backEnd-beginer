const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");

// router
const userRouter = require("./src/router/user.router");

app.use(bodyParser.json());
app.use(userRouter);
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("berjalan mulus");
// });

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
