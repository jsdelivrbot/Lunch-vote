import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { editRestaurant } from "../actions/action_restaurants";

class RestaurantsEdit extends Component {
  componentWillMount () {
    this.props.initialize({
          name: this.props.restaurant.name,
          address : this.props.restaurant.address
        });
  }

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
        <input className="form-control"  type="text" {...field.input} />
        <div className="text-help">
          {/* check for error*/}
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  //values is just what users just wrote on the website
  onSubmit(values) {
    // submit button and go back to index using callback
    this.props.editRestaurant(this.props.match.params.id, values, () => {
      this.props.history.go(-1);
    });
  }

  render() {
    // the handleSubmit is passed to this component's props by Reduxform
    // connection to this file in the bottom of the file
    const { handleSubmit, history, restaurant } = this.props;
    return (
      // when reduxform use handleSubmit to check everything and then
      // use onsubmit to call "createRestaurant" to post
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          // some attribute of field which can be used
          label="Name For Restaurants"
          name="name"
          // this is were it interacts with the user
          component={this.renderField}
        />
        <Field
          label="Address of Restaurants"
          name="address"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to={`/restaurants/${this.props.match.params.id}`} className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.name) {
    errors.name = "Enter a name";
  }
  if (!values.address) {
    errors.address = "Enter the address";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps({ restaurants }, ownProps) {
  return { restaurant: restaurants[ownProps.match.params.id] };
}


export default reduxForm({
  //these are configurations for reduxform
  validate,
  form: "RestaurantsEditForm" // name of the form
})(connect(mapStateToProps, { editRestaurant })(RestaurantsEdit));
