import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRestaurants } from "../actions/action_restaurants";

class Homepage extends Component {
  // when this component is showed in the DOM, immediately this method will
  // be called. Thus, we can fetch the data when user go to that page.
  componentDidMount() {
    this.props.fetchRestaurants();
  }

  renderRestaurants() {
    return _.map(this.props.restaurants, restaurant => {
      return (
        <li className="list-group-item" key={restaurant.id}>
          {/* display every restaurant's title and add link to it */}
          <Link to={`/restaurants/${restaurant.id}`}>
            {restaurant.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          {/* the button to add new restaurant*/}
          <Link className="btn btn-primary" to="/restaurants/new">
            Add a Restaurant
          </Link>
        </div>
        <h3>Restaurants</h3>
        <ul className="list-group">
          {/* in order to show the list of restaurant*/}
          {this.renderRestaurants()}
        </ul>
      </div>
    );
  }
}

//in order to give the homepage component the restaurants state from reducer
//restaurants will be inside props of homepage
function mapStateToProps(state) {
  return { restaurants: state.restaurants };
}



//{ fetchRestaurants } ====
// // Anything returned from this function will end up as props
// on the BookList container
// "function mapDispatchToProps(dispatch) {"
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
//    "return bindActionCreators({ fetchRestaurants: fetchRestaurants }, dispatch);"
// "}"

//connect action and state together
export default connect(mapStateToProps, { fetchRestaurants })(Homepage);
