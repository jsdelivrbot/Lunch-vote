import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import RestaurantsReducer from "./reducer_restaurants";

//reducer item for the whole application
const rootReducer = combineReducers({
  restaurants: RestaurantsReducer,
  form: formReducer
});

export default rootReducer;
