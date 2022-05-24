const user = require("../model/user_model");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//Sign up
const signUp = async (req, res) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 8);

    let data = {
      fullName: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      contactNumber: req.body.contact,
      token: "",
      cartItems: [],
      password: hashPassword,
    };

    await user.create(data);
    return res
      .status(200)
      .json({ status: true, message: "register  succesful" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "something wrong with server" });
  }
};

//login
const login = async (req, res) => {
  try {
    const oldUser = await user.findOne({ email: req.body.email }).lean().exec();
    const token = jwt.sign(
      { id: oldUser._id, email: oldUser.email },
      "sandeep_123"
    );

    await user.findOneAndUpdate({ email: req.body.email }, { token });
    const updatedUser = await user
      .findOne({ email: req.body.email })
      .lean()
      .exec();
    // //console.log(updatedUser);

    const firstName = updatedUser.fullName.split(" ");
    return res.status(200).json({
      token: updatedUser.token,
      name: firstName[0],
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "something wrong with server in controller",
      error: err,
    });
  }
};

//add cart item
const cartUpdate = async (req, res) => {
  try {
    const exUser = await user.findOne({ token: req.body.token }).lean().exec();
    const arr = [...exUser.cartItems, req.body.id];
    await user.findOneAndUpdate(
      { token: req.body.token },
      { cartItems: arr },
      { new: true }
    );
    const datas = await user
      .findOne({ token: req.body.token })
      .populate({ path: "cartItems" })
      .lean()
      .exec();

    // //console.log(datas);
    return res.json({ status: true, cart: datas.cartItems });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "something wrong with server in controller",
      error: err,
    });
  }
};

//get All Cart Item
const getCartItems = async (req, res) => {
  try {
    const cart_data = await user
      .findOne({ token: req.body.token })
      .populate({ path: "cartItems" })
      .lean()
      .exec();
    //console.log(cart_data);
    let totalAmount = determineSum(cart_data.cartItems);

    return res
      .status(200)
      .json({ status: true, cart: cart_data.cartItems, total: totalAmount });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "something wrong with server in controller",
      error: err,
    });
  }
};

//remove single item
const removeItem = async (req, res) => {
  try {
    const cart_data = await user
      .findOne({ token: req.body.token })
      .populate({ path: "cartItems" })
      .lean()
      .exec();

    cart_data.cartItems.splice(req.body.index, 1);

    await user.findOneAndUpdate(
      { token: req.body.token },
      { cartItems: [...cart_data.cartItems] },
      { new: true }
    );

    return res.status(200).json({ status: true });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "something wrong with server in controller",
      error: err,
    });
  }
};

//remove all items
const removeAll = async (req, res) => {
  try {
    await user.findOneAndUpdate(
      { token: req.body.token },
      { cartItems: [] },
      { new: true }
    );

    return res.status(200).json({ status: true });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "something wrong with server in controller",
      error: err,
    });
  }
};

module.exports = {
  signUp,
  login,
  cartUpdate,
  getCartItems,
  removeItem,
  removeAll,
};

function determineSum(arr) {
  let sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i].price;
  }
  return sum;
}
