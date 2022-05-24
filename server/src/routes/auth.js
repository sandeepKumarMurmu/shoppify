const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  signUp,
  login,
  cartUpdate,
  getCartItems,
  removeItem,
  removeAll,
} = require("../controllers/user_controller");
const Signup_middle = require("../middleWare/signUp_middle");
const Login_middle = require("../middleWare/login_middle");
const { Cart_middle } = require("../middleWare/cart_middle");

//siginUp route
router.post(
  "/signup",
  body("firstName")
    .isAlpha()
    .isLength({ min: 3 })
    .withMessage("First name must be of 3 letter"),
  body("lastName")
    .isLength({ min: 3 })
    .withMessage("Last name must be of 3 letter"),
  body("email")
    .isEmail()
    .withMessage("please enter valid email-mail")
    .isLength({ min: 6 })
    .withMessage("please enter valid email-mail length minimum of 6"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Please enter alphanumeric and special characters"),
  Signup_middle,
  signUp
);

//loging route
router.post(
  "/login",

  body("email")
    .isEmail()
    .withMessage("please enter valid email-mail")
    .isLength({ min: 4 })
    .withMessage("please enter valid email-mail length minimum of 6"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Please enter alphanumeric and special characters"),
  Login_middle,
  login
);

router.post("/cart", Cart_middle, cartUpdate);
router.post("/user/cart", getCartItems);
router.post("/cart/remove", removeItem);
router.post("/cart/remove/all", removeAll);
module.exports = router;
