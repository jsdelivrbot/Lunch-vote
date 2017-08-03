import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRestaurant, deleteRestaurant } from "../actions/action_restaurants";

class RestaurantsShow extends Component {
  componentDidMount() {
    //this.props.match.params is provided from the url and react-router
    const { id } = this.props.match.params;
    this.props.fetchRestaurant(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deleteRestaurant(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    // variable restaurant is given by mapStateToProps funtcion below
    // which get the specific restaurant out of the list
    const { restaurant } = this.props;

    // To wait for initialize
    if (!restaurant) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>Name : {restaurant.name}</h3>
        <h6>Address: {restaurant.address}</h6>
        <p>Link : {restaurant.link}</p>
      </div>
    );
  }
}

function mapStateToProps({ restaurants }, ownProps) {
  return { restaurant: restaurants[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchRestaurant, deleteRestaurant })(RestaurantsShow);
