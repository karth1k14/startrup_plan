const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "supersecretkey";

/* REGISTER USER */

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const stmt = db.prepare(
      "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)"
    );

    stmt.run(name, email, hashedPassword, role);

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
};

/* LOGIN USER */

exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = db
    .prepare("SELECT * FROM users WHERE email=?")
    .get(email);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token: token,
  });
};