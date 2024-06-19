const express = require("express");
const bodyParser = require("body-parser");
const passwordValidator = require("password-validator");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Password schema
const schema = new passwordValidator();
schema
  .is()
  .min(8) // Tối thiểu 8 ký tự
  .is()
  .max(100) // Tối đa 100 ký tự
  .has()
  .uppercase() // Ít nhất một ký tự viết hoa
  .has()
  .lowercase() // Ít nhất một ký tự viết thường
  .has()
  .digits() // Ít nhất một số
  .has()
  .symbols() // Ít nhất một ký tự đặc biệt
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Loại trừ mật khẩu phổ biến

// Routes
app.post("/signup", (req, res) => {
  const password = req.body.password;

  // Kiểm tra mật khẩu với schema
  if (schema.validate(password)) {
    // Mật khẩu hợp lệ, thực hiện việc lưu trữ hoặc xử lý khác
    res.send("Mật khẩu hợp lệ.");
  } else {
    // Mật khẩu không hợp lệ, trả về thông báo lỗi
    res.status(400).send("Mật khẩu không đủ mạnh.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
