export const SortReducer = (state = { key: "price", type: 1 }, action) => {
  if (action.type === "SORT") {
    return action.payload;
  } else return state;
};
