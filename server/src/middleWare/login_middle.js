const user = require("../model/user_model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Login_middle = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let Error = [];
      for (var i = 0; i < errors.errors.length; i++) {
        Error.push({ [errors.errors[i].param]: errors.errors[i].msg });
      }
      return res.status(400).json(Error);
    }

    const oldUser = await user.findOne({ email: req.body.email }).lean().exec();
    if (!oldUser)
      return res.status(200).json({
        status: false,
        message: "eamil or password is wrong",
      });

    const match = bcrypt.compareSync(req.body.password, oldUser.password);
    
    if (!match)
      return res.status(200).json({
        status: false,
        message: "eamil or password is wrong",
      });
    next();
  } catch (e) {
    return res
      .status(400)
      .json({ status: false, message: "something wrong with server middle" });
  }
};

module.exports = Login_middle;
