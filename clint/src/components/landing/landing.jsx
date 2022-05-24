import { ModelScrollX } from "../model/landingModel";
import { Carousel } from "../carousel/carousel";
import { AppearCarousel } from "../carousel/carousel_2";
import { useEffect } from "react";
import { ActionCreators } from "../states/store/ActionCreator";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

const image = [
  "https://assets.ajio.com/cms/AJIO/WEB/12052022-D-unisex-topbannercarousel-p3-ethnicwear-brands-4070.jpg",
  "https://assets.ajio.com/cms/AJIO/WEB/12052022-D-unisex-topbannercarousel-p5-brands-4070.jpg",
  "https://assets.ajio.com/cms/AJIO/WEB/13052022-D-unisex-banner1-p4-indiangarage-upto70.jpg",
];
const CarouselImages = [
  "https://cdn.shopclues.com/images/banners/2022/HB4_MensClothing_Web_SYM_05April22.jpg",
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/8/64643be0-700d-4e26-8f12-ae6bc84f9fe11651997447201-Refresh.jpg",
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/8/ca060c20-3c8d-44d6-b852-beaf3d0cf0a41652028231412-Handbags---Clutches_Desk.jpg",
];

const props = {
  saree: {
    url: "https://apna-shoping-app.herokuapp.com/fashion",
    type: "Saree",
    limit: 7,
  },
  t_shirt: {
    url: "https://apna-shoping-app.herokuapp.com/fashion",
    type: "T-Shirt",
    limit: 7,
  },
  casual_shirt: {
    url: "https://apna-shoping-app.herokuapp.com/fashion",
    type: "Casual-Shirt",
    limit: 7,
  },
  formal_shirt: {
    url: "https://apna-shoping-app.herokuapp.com/fashion",
    type: "Formal-Shirt",
    limit: 7,
  },
};

const cart_url = {
  addCart: "https://apna-shoping-app.herokuapp.com/cart",
  getCart: "https://apna-shoping-app.herokuapp.com/user/cart",
  rmSingle: "https://apna-shoping-app.herokuapp.com/cart/remove",
  rmAll: "https://apna-shoping-app.herokuapp.com/cart/remove/all",
};
export const Landing = () => {
  const dispatch = useDispatch();
  const action = bindActionCreators(ActionCreators, dispatch);

  useEffect(() => {
    action.Track(false);
    localStorage.setItem("cartUrl", JSON.stringify(cart_url));
  }, []);

  return (
    <div className="App">
      <Carousel image={image} />
      <ModelScrollX data={props.saree} />
      <AppearCarousel image={CarouselImages} />
      <ModelScrollX data={props.t_shirt} />
      <AppearCarousel image={CarouselImages} />
      <ModelScrollX data={props.casual_shirt} />

      <ModelScrollX data={props.formal_shirt} />
    </div>
  );
};
