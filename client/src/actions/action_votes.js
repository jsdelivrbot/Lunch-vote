import axios from "axios";

// export string type as variable
export const CREATE_VOTE_FOR = "create_vote_for";
export const CREATE_VOTE_AGAINST = "create_vote_against";
export const FETCH_VOTES = "fetch_votes";


//the online post,get,delete request url
const ROOT_URL = "https://vote-lunch.herokuapp.com/api";

export function createVote_for(values, callback) {
  const request = axios
    //use axios method to ask for promise request through url
    .post(`${ROOT_URL}/votes/for`, values)
    //callback is used to wait for the request process complete
    //and then get back to the homepage
    .then(() => callback());

  return {
    type: CREATE_VOTE_FOR,
    payload: request
  };
}

export function createVote_against(values, callback) {
  const request = axios
    //use axios method to ask for promise request through url
    .post(`${ROOT_URL}/votes/against`, values)
    //callback is used to wait for the request process complete
    //and then get back to the homepage
    .then(() => callback());

  return {
    type: CREATE_VOTE_AGAINST,
    payload: request
  };
}

export function fetchVotes(values, callback) {
  const request = axios.get(`${ROOT_URL}/votes`);

  return {
    type: FETCH_VOTES,
    payload: request
  };
}
