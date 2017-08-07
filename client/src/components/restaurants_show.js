import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { fetchRestaurant, deleteRestaurant } from "../actions/action_restaurants";
import { createVote_for, createVote_against } from "../actions/action_votes";

class RestaurantsShow extends Component {
  renderField(field) {
    // this is used to abbreviate field.meta.touched to touched
    const { meta: { touched, error } } = field;
    //if user finish, there will be validate check
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        {/* field.input contians many different props like Onchange and Onfocus */}
        {/* ES6 style to deal with how to express this to ... */}
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {/* check for error*/}
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  componentDidMount() {
    //this.props.match.params is provided from the url and react-router
    const { id } = this.props.match.params;
    const { blur, restaurant} = this.props;
    this.props.fetchRestaurant(id);
    blur("name_restaurant",restaurant.name);
    blur("id_restaurant",restaurant._id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deleteRestaurant(id, () => {
      this.props.history.push("/");
    });
  }

  onSubmit_for(values) {
    // blur is used to add restaurant details to the field which send
    // back to server, which is provided by the redux-form props
    this.props.createVote_for(values, () => {
      this.props.history.push("/");
    });
  }

  onSubmit_against(values) {
    this.props.createVote_against(values, () => {
      this.props.history.push("/");
    });
  }

  renderSubmit_for() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit_for.bind(this))}>
        <button type="submit" className="btn btn-success btn-sm">For</button>
      </form>
    );
  }

  renderSubmit_against() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit_against.bind(this))}>
        <button type="submit" className="btn btn-danger btn-sm">Against</button>
      </form>
    );
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
        <Field
          label="Name of Voter"
          name="name"
          component={this.renderField}
        />
        {this.renderSubmit_for()}
        {this.renderSubmit_against()}
      </div>
    );
  }
}

function mapStateToProps({ restaurants }, ownProps) {
  return { restaurant: restaurants[ownProps.match.params.id] };
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.name) {
    errors.name = "Enter a name";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "VotesNewForm"
})(connect(mapStateToProps, {
  fetchRestaurant, deleteRestaurant,createVote_for,createVote_against
})(RestaurantsShow));
