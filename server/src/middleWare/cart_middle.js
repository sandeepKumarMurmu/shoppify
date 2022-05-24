const user = require("../model/user_model");
const Cart_middle = async (req, res, next) => {
  try {
    if (req.body.token === "")
      return res.status(200).json({
        status: false,
        message: "user dosen't exist please login and try again",
      });
    const exUser = await user.findOne({ token: req.body.token }).lean().exec();

    if (!exUser)
      return res.status(200).json({
        status: false,
        message: "user dosen't exist please login and try again",
      });
    next();
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "something wrong with server in controller",
      error: err,
    });
  }
};



module.exports = { Cart_middle };
