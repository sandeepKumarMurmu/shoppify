const typeAction = "TYPE";
const track = "TRACK";
const sort = "SORT";
const image = "IMAGE";

export const TypeAction = (x) => {
  return (dispatch) => {
    dispatch({
      type: typeAction,
      payload: x,
    });
  };
};
export const Track = (x) => {
  return (dispatch) => {
    dispatch({
      type: track,
      payload: x,
    });
  };
};
export const SortAction = (x) => {
  return (dispatch) => {
    dispatch({
      type: sort,
      payload: x,
    });
  };
};

const view = "VIEW";
export const ViewAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: view,
      payload: data,
    });
  };
};
export const ImageAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: image,
      payload: data,
    });
  };
};

export const LoginAction = (loginData) => {
  return (dispatch) => {
    dispatch({
      type: "LOGIN",
      payload: loginData,
    });
  };
};
export const CartAction = (cart) => {
  return (dispatch) => {
    dispatch({
      type: "ADDCART",
      payload: cart,
    });
  };
};
