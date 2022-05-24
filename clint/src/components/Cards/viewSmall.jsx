import { ActionCreators } from "../states/store/ActionCreator";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
export const SmallCard = ({ image }) => {
  const dipatch = useDispatch();
  const action = bindActionCreators(ActionCreators, dipatch);
  return (
    <>
      <div
        className="view_SmallCard_user"
        onMouseEnter={() => {
          action.ImageAction({ image: image });
        }}
      >
        <img src={image} alt="" />
      </div>
    </>
  );
};
