import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import logger from "redux-logger";

const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({ thunk: true }),
  logger,
];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
