import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import RestaurantsReducer from "./reducer_restaurants";
import VotesReducer from "./reducer_votes";

//reducer item for the whole application
const rootReducer = combineReducers({
  restaurants: RestaurantsReducer,
  votes : VotesReducer,
  form: formReducer
});

export default rootReducer;
