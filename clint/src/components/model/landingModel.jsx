import { useEffect, useState } from "react";
import { CardImage } from "../Cards/for_landing";
import Button from "@mui/material/Button";
import axios from "axios";
import "./landingModel.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../states/store/ActionCreator";
import { useNavigate } from "react-router-dom";

export const ModelScrollX = ({ data }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const action = bindActionCreators(ActionCreators, dispatch);
  const [TypeData, setTypeData] = useState([]);

  useEffect(() => {
    action.TypeAction({
      url: "https://apna-shoping-app.herokuapp.com/fashion",
    });
    getTypeData();
  }, []);

  function getTypeData() {
    const { url, type, limit } = data;
    axios.get(`${url}?type=${type}&_limit=${limit}`).then(({ data }) => {
      setTypeData(data.data);
    });
  }

  function handelClick(x) {
    action.TypeAction({ url: data.url });
    if (x === 1) {
      nav(`/products/${data.type}`);
    } else {
      nav(`/products/all`);
    }
  }
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <div className="model_bar_user">
          <div className="user_model_button">
            <Button
              className="btn btn-primary"
              variant="outlined disabled"
              color="teal"
            >
              {data.type}
            </Button>
          </div>
          <div className="user_model_button">
            <Button
              variant="outlined"
              onClick={() => {
                handelClick(0);
              }}
            >
              Products
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handelClick(1);
              }}
            >
              View All
            </Button>
          </div>
        </div>
        <div className="overflow-scroll model_container_user ">
          {TypeData.map((ele, i) => (
            <CardImage data={ele} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};
