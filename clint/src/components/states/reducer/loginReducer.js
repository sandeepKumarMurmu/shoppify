const initialState = JSON.parse(localStorage.getItem("loginData")) || {
  token: "",
  status: false,
  name: "",
};

export const LoginReducer = (state = initialState, action) => {
  if (action.type === "LOGIN") {
    console.log("Action pay load in side action", action.payload);
    state = { ...action.payload };
    return state;
  }
  return state;
};
