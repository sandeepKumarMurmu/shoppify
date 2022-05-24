import "./cart.css";
import { CartImageCard } from "../Cards/cart_image_cart";
import { Detail_cart } from "./detail_cat";
import { Carousel_3 } from "../carousel/carousel_3";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const carousel_image_1 = [
  "https://img.freepik.com/free-photo/magnificent-woman-long-bright-skirt-dancing-studio-carefree-inspired-female-model-posing-with-pleasure-yellow_197531-11084.jpg?size=626&ext=jpg&query=clothing%20banner&position=0&from_view=keyword&ga=GA1.2.1408854892.1652631742",
  "https://img.freepik.com/free-photo/woman-shopping-bags-copy-space_23-2148674356.jpg?size=626&ext=jpg&query=clothing%20banner&position=18&from_view=keyword&ga=GA1.2.1408854892.1652631742",
  "https://img.freepik.com/free-photo/young-asia-lady-with-positive-expression-smile-broadly-dressed-casual-clothing-isolated-blue-background-happy-adorable-glad-woman-rejoices-success-panoramic-banner-background-with-copy-space_7861-2714.jpg?size=626&ext=jpg&query=clothing%20banner&position=19&from_view=keyword&ga=GA1.2.1408854892.1652631742",
];
export const Cart = () => {
  const [cart, setCart] = useState({ status: "", total: 0, cart: [] });
  const state = useSelector((state) => state.LoginReducer);
  const { updateCount, getCart } = useSelector((state) => state.CartReducer);

  useEffect(() => {
    get_cart_items();
  }, [updateCount]);

  function get_cart_items() {
    axios.post(getCart, { token: state.token }).then(({ data }) => {
      // console.log(data);
      setCart(data);
    });
  }
  // console.log(cart);
  return (
    <>
      <div className="Contain_cart_user">
        <Carousel_3 images={carousel_image_1} />
        <p className="h4" style={{ color: "red" }}>
          Your cart is ready{" "}
        </p>
        <div className="detail_image_cart_container_user">
          <div className="col_user_1">
            {cart.cart.map((ele, i) => (
              <CartImageCard data={ele} index={i} key={i} />
            ))}
          </div>
          <Detail_cart data={cart} />
        </div>
      </div>
    </>
  );
};
