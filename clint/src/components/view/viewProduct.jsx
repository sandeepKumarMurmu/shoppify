import { useEffect } from "react";
import { AppearCarousel } from "../carousel/carousel_2";
import { ActionCreators } from "../states/store/ActionCreator";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ViewCard } from "../Cards/viewCard";
import { ViewDetail } from "../detail/viewDetail";
import "./viewProduct.css";
import { useSelector } from "react-redux";
import { ModelScrollX } from "../model/landingModel";
import { SmallCard } from "../Cards/viewSmall";
const CarouselImages = [
  "https://m.media-amazon.com/images/I/81KVdS+84PL._SX3000_.jpg",
  "https://cdn.shopclues.com/images/banners/2022/HB4_MensClothing_Web_SYM_05April22.jpg",
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/8/64643be0-700d-4e26-8f12-ae6bc84f9fe11651997447201-Refresh.jpg",
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/8/ca060c20-3c8d-44d6-b852-beaf3d0cf0a41652028231412-Handbags---Clutches_Desk.jpg",
];
// const image = [
//   "https://assets.ajio.com/cms/AJIO/WEB/12052022-D-unisex-topbannercarousel-p3-ethnicwear-brands-4070.jpg",
//   "https://assets.ajio.com/cms/AJIO/WEB/12052022-D-unisex-topbannercarousel-p5-brands-4070.jpg",
//   "https://assets.ajio.com/cms/AJIO/WEB/13052022-D-unisex-banner1-p4-indiangarage-upto70.jpg",
// ];
export const ViewProduct = () => {
  const URL = useSelector((state) => state.TypeReducer);

  const data = useSelector((state) => state.ViewReducer);
  const prop = { url: URL.url, type: data.type, limit: 6 };
  const dispatch = useDispatch();
  const action = bindActionCreators(ActionCreators, dispatch);
  useEffect(() => {
    action.Track(false);
  }, []);
  return (
    <div className="view_container_user">
      <div className="view_detail_container_user">
        <div className="view_left_user">
          {data.image.map((ele) => (
            <SmallCard image={ele} />
          ))}
        </div>
        <div className="view_middle_user">
          <ViewCard />
        </div>
        <div className="view_right_user">
          <ViewDetail data={data} />
        </div>
      </div>
      <div className="carousel_container_view_user">
        <AppearCarousel image={CarouselImages} />
      </div>
      <div>
        <ModelScrollX data={prop} />
      </div>
    </div>
  );
};
