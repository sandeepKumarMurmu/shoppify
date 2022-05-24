import "../login/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionCreators } from "../../states/store/ActionCreator";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import axios from "axios";

export const SignUp = () => {
  const nav = useNavigate();
  const diaspatch = useDispatch();
  const action = bindActionCreators(ActionCreators, diaspatch);
  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    password: "",
  });
  function handelChande(e) {
    const { id, value } = e.target;
    setSignUp({ ...signUp, [id]: value });
  }
  function handelSubmit() {
    axios
      .post("https://apna-shoping-app.herokuapp.com/signup", signUp)
      .then(({ data }) => {
        if (!data.status) {
          cleanUpData();
          alert(`${data.message}`);
        } else {
          //console.g(data);
          cleanUpData();
          nav("/login");
        }
      });
  }
  function cleanUpData() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("password").value = "";
    setSignUp({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      password: "",
    });
  }
  action.Track(false);
  return (
    <>
      <div className="outer_container">
        <div className="main_login_container">
          <div className="signIn_tag">
            <p className="h4 text-light text-decoration-underline ">Sign Up</p>
          </div>
          <div className="form_container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handelSubmit();
              }}
            >
              <label htmlFor="FirstName">First Name</label>
              <input
                type="text"
                name="FirstName"
                id="firstName"
                // onFocus={(this.value = "")}
                onChange={(e) => {
                  handelChande(e);
                }}
              />
              <label htmlFor="LastName">Last Name</label>
              <input
                onChange={(e) => {
                  handelChande(e);
                }}
                type="text"
                name="LastName"
                id="lastName"
              />
              <label htmlFor="Email">Email</label>
              <input
                onChange={(e) => {
                  handelChande(e);
                }}
                type="email"
                name="Email"
                id="email"
              />
              <label htmlFor="Contact">Contact Number</label>
              <input
                onChange={(e) => {
                  handelChande(e);
                }}
                type="Text"
                name="Contact"
                id="contact"
              />

              <label htmlFor="Password">Password</label>
              <input
                onChange={(e) => {
                  handelChande(e);
                }}
                type="password"
                name="Password"
                id="password"
              />
              <input
                type="submit"
                className="h5 text-secondary "
                value={"SignUp"}
              />
            </form>
          </div>
          <div className="Nav_signUp ">
            <Link to="/login" className="text-decoration-none">
              <p className="p text-light ">Already have an account ? Login</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
