import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import counter from "./counter";

export default combineReducers({
  counter,
  auth,
});
