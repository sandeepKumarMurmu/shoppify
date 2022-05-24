import { ActionCreators } from "../states/store/ActionCreator";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
export const NumberFilter = ({ data }) => {
  const dispatch = useDispatch();
  const action = bindActionCreators(ActionCreators, dispatch);

  function priceFilter(i) {
    if (i === 0) {
      action.SortAction({ key: "price", type: -1 });
    } else action.SortAction({ key: "price", type: 1 });
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
                style={{ width: "100%" }}
                onClick={() => {
                  priceFilter(i);
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
