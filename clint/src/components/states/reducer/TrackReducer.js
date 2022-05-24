export const TrackReducer = (state = false, action) => {
  if (action.type === "TRACK") return action.payload;
  else return state;
};
