export const ImageReducer = (state = {image:""}, action) => {
  if (action.type === "IMAGE") return action.payload;
  else return state;
};
