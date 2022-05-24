import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ActionCreators } from "../states/store/ActionCreator";
import axios from "axios";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
//main function
export const CardImage = ({ data }) => {
  // console.log("data in  CardImage ",data)
  const dispatch = useDispatch();
  const nav = useNavigate();
  const action = bindActionCreators(ActionCreators, dispatch);
  const { addCart } = useSelector((state) => state.CartReducer);
  const { token } = useSelector((state) => state.LoginReducer);

  function handelView() {
    action.TypeAction({
      url: "https://apna-shoping-app.herokuapp.com/fashion",
    });
    action.ViewAction(data);
    action.ImageAction({ image: data.image[0] });
    nav(`/product/${data.title}`);
  }
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
      <Card sx={{ minWidth: 220 }} elevation={10}>
        <CardContent>
          <img
            src={data.image[0]}
            alt={data.title}
            style={{ width: "100%", borderRadius: 8, height: "320px" }}
          />
          <Typography variant="body2" color="text.secondary">
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ color: "red", fontWeight: "bold" }}>Price : </span>
            <span style={{ color: "red", fontWeight: "bold" }}>
              {data.price}
            </span>
            <span style={{ color: "red", fontWeight: "bold" }}>/-</span>
          </Typography>
          <CardActions style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="small"
              onClick={() => {
                handelView();
              }}
            >
              View
            </Button>
            <Button
              size="small"
              onClick={() => {
                handelCart();
              }}
            >
              Cart
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};
