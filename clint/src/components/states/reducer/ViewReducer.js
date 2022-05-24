export const ViewReducer = (state = {}, action) => {
  if (action.type === "VIEW") return action.payload;
  return state;
};
