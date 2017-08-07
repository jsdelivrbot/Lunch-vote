import _ from "lodash";
import { FETCH_VOTES} from "../actions/action_votes";

export default function(state = {}, action) {
  //do the action according to the action.type
  switch (action.type) {
    case FETCH_VOTES:
      //display data according to their id， use id as data's key
      return _.mapKeys(action.payload.data, "_id");
    default:
      return state;
  }
}
