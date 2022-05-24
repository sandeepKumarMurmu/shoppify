import { combineReducers } from "redux";
import { TypeReducer } from "./typeReducer";
import { TrackReducer } from "./TrackReducer";
import { SortReducer } from "./SortReducer";
import { ViewReducer } from "./ViewReducer";
import { ImageReducer } from "./ImageReducer";
import { LoginReducer } from "./loginReducer";
import { CartReducer } from "./CartReducer";
export const Reducers = combineReducers({
  TypeReducer,
  TrackReducer,
  SortReducer,
  ViewReducer,
  ImageReducer,
  LoginReducer,
  CartReducer,
});
