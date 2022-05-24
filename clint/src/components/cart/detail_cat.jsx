import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Carousel_3 } from "../carousel/carousel_3";
import { ActionCreators } from "../states/store/ActionCreator";
const carousel_image_1 = [
  "https://img.freepik.com/free-photo/excited-white-girl-bright-stylish-glasses-posing-pink-dreamy-curly-woman-playing-with-her-ginger-hair-laughing_197531-11045.jpg?size=626&ext=jpg&query=fashion&position=4&from_view=keyword",
  "https://img.freepik.com/free-photo/portrait-smiling-beautiful-girl-her-handsome-boyfriend-laughing-happy-cheerful-couple-sunglasses_158538-5002.jpg?size=626&ext=jpg&query=fashion&position=3&from_view=keyword",
  "https://img.freepik.com/free-photo/pretty-young-stylish-sexy-woman-pink-luxury-dress-summer-fashion-trend-chic-style-sunglasses-blue-studio-background-shopping-holding-paper-bags-talking-mobile-phone-shopaholic_285396-2957.jpg?size=626&ext=jpg&query=fashion&position=1&from_view=keyword",
];

//main function
export const Detail_cart = ({ data }) => {
  //values and varialbles
  const dispatch = useDispatch();
  const action = bindActionCreators(ActionCreators, dispatch);
  const { rmAll } = useSelector((state) => state.CartReducer);
  const { token } = useSelector((state) => state.LoginReducer);

  //functions
  function removeAll() {
    axios.post(rmAll, { token }).then(({ data }) => {
      action.CartAction(1);
      //console.log(data);
    });
  }
  return (
    <>
      <div className="col_user_2">
        <div>
          <p className="h5">Cart Details</p>
          <p className="h6" style={{ display: "inline", color: "GrayText" }}>
            Total items{" "}
            <span className="h5" style={{ display: "inline", color: "brown" }}>
              {data.cart.length}
            </span>
          </p>
          <p className="h6" style={{ color: "GrayText" }}>
            Part of your order qualifies for FREE Delivery.
          </p>
          <p className="h6" style={{ color: "GrayText" }}>
            Total{" "}
            <span className="h5" style={{ display: "inline", color: "red" }}>
              {data.total}
            </span>
            /-
          </p>
        </div>
        <div className="button_container_cart">
          <button className="btn btn-success">Check Out</button>
          <button
            className="btn btn-danger"
            onClick={() => {
              removeAll();
            }}
          >
            Remove All
          </button>
        </div>
        <Carousel_3 images={carousel_image_1} />
      </div>
    </>
  );
};
