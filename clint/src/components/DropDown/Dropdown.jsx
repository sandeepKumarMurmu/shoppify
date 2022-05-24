import { ActionCreators } from "../states/store/ActionCreator";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";

export const DropDown = ({ data }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const action = bindActionCreators(ActionCreators, dispatch);
  function handelClick(query) {
    action.TypeAction({
      url: "https://apna-shoping-app.herokuapp.com/fashion",
    });
    nav(`/products/${query}`);
  }
  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {data.cataogary}
        </button>
        <ul
          className="dropdown-menu bg-primary"
          aria-labelledby="dropdownMenuButton2"
        >
          {data.type.map((ele, i) => (
            <li key={i}>
              <button
                className="btn btn-primary"
                style={{
                  width: "100%",
                }}
                onClick={() => {
                  handelClick(ele);
                }}
              >
                {ele}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
