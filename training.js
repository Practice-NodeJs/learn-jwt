const jwt = require("jsonwebtoken");

const data = { id: 1, username: "tintt", age: 22 };
const secret = "123456";

jwt.sign(data, secret, { expiresIn: 30 }, (err, data) => {
  console.log("Log :  data", data);
});

try {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0aW50dCIsImFnZSI6MjIsImlhdCI6MTY0ODY5NTE4OCwiZXhwIjoxNjQ4Njk1MjE4fQ.ahMzZodOyuT2KQKIgMeXNprc6pKet0rAty1qWL3qmWI";
  const result = jwt.verify(token, secret);
  console.log("Log :  result", result);
} catch (error) {
  console.log("Log :  error", error);
}
