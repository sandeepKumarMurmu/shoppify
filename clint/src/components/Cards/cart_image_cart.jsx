import { useNavigate } from "react-router-dom";
import { ActionCreators } from "../states/store/ActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export const CartImageCard = ({ data, index }) => {
  //console.log("index : ", index);
  const dispatch = useDispatch();
  const action = bindActionCreators(ActionCreators, dispatch);
  const { token } = useSelector((state) => state.LoginReducer);
  const { rmSingle } = useSelector((state) => state.CartReducer);

  const nav = useNavigate();

  function handelView() {
    action.TypeAction({
      url: "https://apna-shoping-app.herokuapp.com/fashion",
    });
    action.ViewAction(data);
    action.ImageAction({ image: data.image[0] });
    nav(`/product/${data.title}`);
  }

  function RmoveCartItem() {
    axios.post(rmSingle, { index, token }).then(({ data }) => {
      if (data.status) action.CartAction(1);
    });
  }
  return (
    <>
      <div className="image_cart_container">
        <img src={data.image[0]} alt="" />
        <div className="product_title_cart">
          <p
            className="p"
            style={{
              width: "200px",
              overflow: "hidden",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#525E75",
            }}
          >
            {data.title}
          </p>
          <p
            className="p"
            style={{
              overflow: "hidden",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#712B75",
            }}
          >
            Price{" "}
            <p
              className="h5"
              style={{
                display: "inline",
                color: "#46244C",
                fontWeight: "bold",
              }}
            >
              {data.price}
            </p>
            /-{" "}
            <span style={{ display: "inline", color: "#FF5D5D" }}>
              {data.offer} %
            </span>{" "}
            off
          </p>
        </div>
        <div className="button_container_cart">
          <button
            className="btn btn-primary"
            onClick={() => {
              handelView();
            }}
          >
            {" "}
            View
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              RmoveCartItem();
            }}
          >
            {" "}
            Remove
          </button>
        </div>
      </div>
    </>
  );
};
