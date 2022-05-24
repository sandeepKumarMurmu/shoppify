export const TypeReducer = (state = "", action) => {
    //console.log("action: ", action.payload);
    if (action.type === "TYPE") return action.payload;
    else return state;
  };
  