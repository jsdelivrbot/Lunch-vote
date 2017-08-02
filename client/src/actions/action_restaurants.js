import axios from "axios";

// export string type as variable
export const FETCH_RESTAURANTS = "fetch_restaurants";
export const FETCH_RESTAURANT = "fetch_restaurant";
export const CREATE_RESTAURANT  = "create_restaurant";
export const DELETE_RESTAURANT  = "delete_restaurant";

//the online post,get,delete request url
const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=PAPERCLIP1234";

export function fetchRestaurants() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_RESTAURANTS,
    payload: request
  };
}

export function createRestaurant(values, callback) {
  const request = axios
    //use axios method to ask for promise request through url
    .post(`${ROOT_URL}/posts${API_KEY}`, values)
    //callback is used to wait for the request process complete
    //and then get back to the homepage
    .then(() => callback());

  return {
    type: CREATE_RESTAURANT,
    payload: request
  };
}

export function fetchRestaurant(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_RESTAURANT,
    payload: request
  };
}

export function deleteRestaurant(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());

  return {
    type: DELETE_RESTAURANT,
    payload: id
  };
}
