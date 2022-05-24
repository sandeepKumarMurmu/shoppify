import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ActionCreators } from "../states/store/ActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export const ViewDetail = ({ data }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const action = bindActionCreators(ActionCreators, dispatch);
  const { token } = useSelector((state) => state.LoginReducer);
  const { addCart } = useSelector((state) => state.CartReducer);
  // console.log("dat in view Detail", data);
  useEffect(() => {}, [data]);

  function handelCart() {
    axios.post(`${addCart}`, { id: data._id, token }).then(({ data }) => {
      if (data.status === false) {
        alert(`${data.message}`);
        nav("/login");
      } else {
        action.CartAction(1);
      }
    });
  }

  return (
    <>
      <div className="" style={{ fontWeight: "bold" }}>
        <div
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            textDecoration: "underLine",
            textDecorationColor: "blueviolet",
          }}
        >
          {" "}
          <p className="h4" style={{ color: "blueviolet" }}>
            Product Detail
          </p>
        </div>
        <div className="head_viewDetail_user">
          <p className="h4" style={{ color: "skyblue" }}>
            {data.title}
          </p>
        </div>
        <div className="detail_viewDetail_user">
          <p className="h5">
            Price :{" "}
            <span className="h4 " style={{ color: "red" }}>
              {data.price}
            </span>
            /-{" "}
            <span className="h6" style={{ color: "gray" }}>
              <s>965/-</s>
            </span>
            <span style={{ color: "rgb(32, 186, 158)" }}>
              {" "}
              {data.offer}% off
            </span>
          </p>
          <div>
            <p className="h5">
              Size{" "}
              <span>
                {data.size.map((ele, i) => (
                  <button
                    key={i}
                    className="btn btn-outline-secondary"
                    disabled
                    style={{ marginLeft: "4%", width: "60px" }}
                  >
                    {ele}
                  </button>
                ))}
              </span>
            </p>
            <p className="h5">
              Color{" "}
              <span>
                <button
                  className="btn btn-outline-secondary"
                  disabled
                  style={{ marginLeft: "4%", width: "60px" }}
                >
                  {data.color}
                </button>
              </span>
            </p>
          </div>
          <p className="h5">
            Ratings <span style={{ color: "brown" }}>X.X</span>{" "}
          </p>
        </div>
        <div>
          <p
            className="description_viewDetail_user"
            style={{ color: "rgb(47, 43, 43)" }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            beatae quos ut iste quisquam blanditiis deserunt consequatur,
            temporibus vel ducimus explicabo quae ipsa sequi modi, voluptatibus
            laboriosam, iure sint est?
          </p>
        </div>
        <div></div>
        <div className="ButtonContainer">
          <button
            className="btn btn-primary"
            onClick={() => {
              handelCart();
            }}
          >
            Cart
          </button>
          <button className="btn btn-danger">Buy</button>
        </div>
      </div>
    </>
  );
};
