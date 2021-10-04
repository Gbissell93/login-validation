
const bcrypt = require("bcrypt");



const User = require("../model/User");

async function createUser(req, res) {
  

  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    let savedUser = await createdUser.save();

    res.json({ message: "success", payload: savedUser });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  //log the user in using email and password
  //if email does not exists, error message "please go sign up"
  //if email exists but wrong password error message "please check your email and password"
  //if successful - for now send message "Login success"

  try {
    let foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(500).json({
        message: "error",
        error: "please check your email and password",
      });
    } else {
      let comparedPassword = await bcrypt.compare(password, foundUser.password);

      if (!comparedPassword) {
        return res.status(500).json({
          message: "error",
          error: "Please check your email and password",
        });
      } else {
        return res.json({
          message: "login successful",
        });
      }
    }
  } catch (e) {
    res.status(500).json({ message: "error", error: e.message });
  }
}

module.exports = {
  createUser,
  login,
};