import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ActionCreators } from "../../states/store/ActionCreator";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

//main function starts
export const Login = () => {
  //initialiations
  const diaspatch = useDispatch();
  const action = bindActionCreators(ActionCreators, diaspatch);

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  //functions
  function cleanUpData() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
  function handelChange(e) {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  }

  action.Track(false);
  function handelSubmit() {
    axios
      .post("https://apna-shoping-app.herokuapp.com/login", loginData)
      .then(({ data }) => {
        //console.g(data);
        if (!data.status) {
          cleanUpData();
          alert(`${data.message}`);
        } else {
          cleanUpData();
          localStorage.setItem("loginData", JSON.stringify(data));
          action.LoginAction({ ...data });
          window.location.href = "/";
        }
      });
  }

  //render
  return (
    <>
      <div className="outer_container">
        <div className="main_login_container">
          <div className="signIn_tag">
            <p className="h4 text-light text-decoration-underline ">Login</p>
          </div>
          <div className="form_container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handelSubmit();
              }}
            >
              <label htmlFor="UserName">Email</label>
              <input
                onChange={(e) => {
                  handelChange(e);
                }}
                type="text"
                name="UserName"
                id="email"
              />
              <label htmlFor="Password">Password</label>
              <input
                onChange={(e) => {
                  handelChange(e);
                }}
                type="password"
                name="Password"
                id="password"
              />
              <input
                type="submit"
                className="h5 text-secondary"
                value={"Login"}
              />
            </form>
          </div>
          <div className="Nav_signUp">
            <Link to="/signup" className="text-decoration-none">
              <p className="p text-light">don't have an account ? SignUp</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
