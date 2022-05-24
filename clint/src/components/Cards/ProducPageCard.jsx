import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import { useNavigate } from "react-router-dom";
import { ActionCreators } from "../states/store/ActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//main function
export const ProductPageCard = ({ data }) => {
  const dispatch = useDispatch();
  const action = bindActionCreators(ActionCreators, dispatch);
  const { token } = useSelector((state) => state.LoginReducer);
  const { addCart } = useSelector((state) => state.CartReducer);
  const nav = useNavigate();
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
      <ImageListItem>
        <Card sx={{ maxWidth: 200 }}>
          <CardMedia component="img" image={data.image[0]} alt="green iguana" />
          <CardContent>
            <Typography
              variant="body2"
              style={{ color: "green" }}
              align="center"
            >
              {data.title}
            </Typography>
            <span>{""}</span>
            <Typography variant="body2" color="text.secondary" align="center">
              <span style={{ color: "red", fontWeight: "bold" }}>Price : </span>
              <span style={{ color: "red", fontWeight: "bold" }}>
                {data.price}
              </span>
              <span style={{ color: "red", fontWeight: "bold" }}>/-</span>
            </Typography>
          </CardContent>
          <CardActions>
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
        </Card>
      </ImageListItem>
    </>
  );
};
