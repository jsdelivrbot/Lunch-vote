import _ from "lodash";
import { FETCH_RESTAURANTS, FETCH_RESTAURANT, DELETE_RESTAURANT } from
        "../actions/action_restaurants";

export default function(state = {}, action) {
  //do the action according to the action.type
  switch (action.type) {
    case DELETE_RESTAURANT:
      //remove the id of the delete post
      return _.omit(state, action.payload);
    case FETCH_RESTAURANT:
      //show the selected restaurants according to the id
      return { ...state, [action.payload.data._id]: action.payload.data };
    case FETCH_RESTAURANTS:
      //display data according to their id， use id as data's key
      return _.mapKeys(action.payload.data, "_id");
    default:
      return state;
  }
}
