const UserSchema = require("../module/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendSignupEmail } = require("./email");

const Login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "User Not Found",
    });
  }
  const Match = await bcrypt.compare(password, user.password);
  if (!Match) {
    return res.status(401).json({
      message: "Password Does Not Match",
    });
  }

  const token = jwt.sign(
    {
      user: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" }
  );

  const update = await UserSchema.findOneAndUpdate({ email, token });
  await update.save();

  return res.status(200).json({
    message: "Login SuccessFull",
    user,
    token: token,
  });
};

const Signup = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await UserSchema.findOne({ email });
  if (user) {
    return res.status(401).json({
      message: "Email Already Exist",
    });
  }
  const hashPassword = bcrypt.hashSync(password, 10);

  const userInfo = await UserSchema({
    username,
    email,
    password: hashPassword,
  });
  await userInfo.save();

  await sendSignupEmail(username, email);

  return res.status(200).json({
    message: "Signup SuccessFull",
  });
};
const Auth = {
  Login,
  Signup,
};
module.exports = Auth;
