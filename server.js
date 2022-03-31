const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

const accountModel = require("./account");

app.use(cookieParser());

//config body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const url = path.join(__dirname, "login.html");
  res.sendFile(url);
});

//login
app.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  accountModel
    .findOne({ username, password })
    .then((data) => {
      if (data) {
        const token = jwt.sign({ _id: data._id }, "123456");
        res.json({
          message: "Đăng nhập thành công!",
          token,
        });
      } else {
        res.status(400).json("Sai tài khoản hoặc mật khẩu!");
      }
    })
    .catch((err) => {
      res.status(500).json("Lỗi bên server!");
    });
});

app.get(
  "/private",
  (req, res, next) => {
    const token = req.cookies.token;
    try {
      const data = jwt.verify(token, "123456");
      if (data) {
        accountModel
          .findOne({
            _id: data._id,
          })
          .then((data) => {
            res.username = data.username;
            next();
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      return res.status(500).json("Bạn chưa đăng nhập !");
    }
  },
  (req, res, next) => {
    res.json(`Welcome ${res.username} !`);
  }
);

app.listen(3000, () => {
  console.log("Server start !");
});
