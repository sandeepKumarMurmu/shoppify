import * as React from "react";
import ImageList from "@mui/material/ImageList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "../states/store/ActionCreator";
import { bindActionCreators } from "redux";
import { ProductPageCard } from "../Cards/ProducPageCard";
import "./Listing.css";

export default function WovenImageList() {
  const { routeName } = useParams();
  const limit = 8;

  const dispatch = useDispatch();
  const url = useSelector((state) => state.TypeReducer);
  const action = bindActionCreators(ActionCreators, dispatch);

  const isActive1 = useMediaQuery("(min-width:998px)");
  const isActive2 = useMediaQuery("(min-width:600px)");
  const sort = useSelector((state) => state.SortReducer);

  const [itemData, setitemData] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(10);
  function getAll() {
    if (routeName === "all") {
      axios
        .get(`${url.url}/?_sort=${sort.type}&_page=1&_limit=${limit}`)
        .then(({ data }) => {
          setitemData(data.data);
        });
    } else {
      axios
        .get(
          `${url.url}/?_sort=${sort.type}&_page=1&_limit=${limit}&type=${routeName}`
        )
        .then(({ data }) => {
          setitemData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function getPage() {
    if (routeName === "all") {
      axios.get(`${url.url}`).then(({ data }) => {
        setPageNumber(data.data.length);
      });
    } else {
      axios.get(`${url.url}/?type=${routeName}`).then(({ data }) => {
        setPageNumber(data.data.length);
      });
    }
  }

  React.useEffect(() => {
    localStorage.setItem("Track", true);
    action.Track(true);
    getPage();
    getAll();
  }, [routeName, sort]);
  const h = window.innerHeight * 0.823;
  return (
    <>
      <div className="outer_container_listing">
        <ImageList
          className="container_user_listing"
          sx={{ width: "80%", height: h }}
          variant="woven"
          cols={isActive1 ? 4 : isActive2 ? 3 : 2}
          gap={8}
        >
         
          {itemData.map((item) => (
            <ProductPageCard
              data={item}
              key={item._id}
              style={{ margin: "auto" }}
            />
          ))}
        </ImageList>
      </div>
      <Stack spacing={1}>
        <Pagination
          style={{ margin: "auto", padding: "20px" }}
          defaultPage={1}
          count={Math.ceil(pageNumber / limit)}
          color="secondary"
          onChange={(e, d) => {
            if (routeName === "all") {
              axios
                .get(
                  `https://apna-shoping-app.herokuapp.com/fashion?_sort=${sort.type}&_page=${d}&_limit=${limit}`
                )
                .then(({ data }) => {
                  setitemData(data.data);
                });
            } else {
              axios
                .get(
                  `https://apna-shoping-app.herokuapp.com/fashion?_sort=${sort.type}&type=${routeName}&_page=${d}&_limit=${limit}`
                )
                .then(({ data }) => {
                  setitemData(data.data);
                });
            }
          }}
        />
      </Stack>
    </>
  );
}
