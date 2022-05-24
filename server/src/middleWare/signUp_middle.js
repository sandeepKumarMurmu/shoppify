const { validationResult } = require("express-validator");

const User = require("../model/user_model");

const Signup_middle = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let Error = [];
      for (var i = 0; i < errors.errors.length; i++) {
        Error.push({ [errors.errors[i].param]: errors.errors[i].msg });
      }
      return res.status(400).json(Error);
    }

    const oldUser = await User.findOne({ email: req.body.email }).lean().exec();

    if (oldUser)
      return res.status(200).json({
        status: false,
        message: "eamil already exist, try another email address",
      });

    next();
  } catch (e) {
    return res.status(400).json({ e });
  }
};

module.exports = Signup_middle;
