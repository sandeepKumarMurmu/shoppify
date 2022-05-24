import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./filterNav.css";
import axios from "axios";
import { DropDown } from "../DropDown/Dropdown";
import { NumberFilter } from "../DropDown/NumberFilter";
import { useState } from "react";
import { useEffect } from "react";
const men = {
  cataogary: "Men",
  type: ["Casual-Shirt", "T-Shirt", "Formal-Shirt"],
};
const women = {
  cataogary: "Women",
  type: ["Saree", "Kurties", "Formals"],
};
const price = {
  cataogary: "Price",
  type: ["High to Low", "Low to High"],
};

//main function
export const MainNavBar = () => {
  const nav = useNavigate();
  const track = useSelector((state) => state.TrackReducer);
  const state = useSelector((state) => state.LoginReducer);
  const { getCart, updateCount } = useSelector((state) => state.CartReducer);
  // console.log("get ", getCart);

  const [cart, setCart] = useState({ status: false, items: 0 });

  function handelLogOut() {
    localStorage.removeItem("loginData");
    window.location.href = "/";
  }

  useEffect(() => {
    get_cart_items();
  }, [updateCount]);

  function get_cart_items() {
    axios.post(`${getCart}`, { token: state.token }).then(({ data }) => {
      setCart({ status: true, items: data.cart.length });
    });
  }
  return (
    <>
      <div
        className="main_nav_user bg-primary"
        style={{ padding: 0, marginTop: 0 }}
      >
        <nav
          className="navbar navbar-expand-lg navbar-light bg-primary  user_nav "
          id="user_nav"
        >
          <div className="container-fluid">
            <Typography className="navbar-brand ">
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Shoppify
              </Link>
            </Typography>
            <button
              className="navbar-toggler user_toggle"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-2 User_ul"
                id="user_ul"
              >
                {state.status ? (
                  <li className="nav-item">
                    <button
                      className="btn btn-primary user_ul_button"
                      id="LogOut_user"
                      aria-current="page"
                      onClick={() => {
                        handelLogOut();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link to="/signup">
                      <button
                        className="btn btn-primary user_ul_button"
                        id="sign_user"
                        aria-current="page"
                      >
                        Sign Up
                      </button>
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  {state.status ? (
                    <button
                      className="btn btn-primary user_ul_button"
                      id="login_user"
                      aria-current="page"
                      disabled
                    >
                      {state.name}
                    </button>
                  ) : (
                    <Link to="/login">
                      <button
                        className="btn btn-primary user_ul_button"
                        id="login_user"
                        aria-current="page"
                      >
                        Login
                      </button>
                    </Link>
                  )}
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-primary position-relative user_ul_button"
                    aria-current="page"
                    onClick={() => {
                      if (cart.status) nav("/user/cart");
                      else {
                        alert("Please login ");
                        nav("/login");
                      }
                    }}
                  >
                    Cart
                    {cart.status && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart.items}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    )}
                  </button>
                </li>

                <li className="nav-item ">
                  <DropDown data={women} />
                </li>

                <li className="nav-item">
                  <DropDown data={men} />
                </li>
                {track ? (
                  <li className="nav-item">
                    <NumberFilter data={price} />
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
