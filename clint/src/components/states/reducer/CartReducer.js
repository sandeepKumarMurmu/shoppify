const initalState = JSON.parse(localStorage.getItem("cartUrl"));

export const CartReducer = (
  state = { ...initalState, updateCount: 0 },
  action
) => {
  if (action.type === "ADDCART") {
    const count = action.payload + state.updateCount;
    return { ...state, updateCount: count };
  } else return state;
};
