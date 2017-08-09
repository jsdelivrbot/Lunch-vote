import _ from "lodash";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRestaurants } from "../actions/action_restaurants";
import { fetchVotes } from "../actions/action_votes";
import Moment from 'react-moment';

class Homepage extends Component {
  // when this component is showed in the DOM, immediately this method will
  // be called. Thus, we can fetch the data when user go to that page.
  componentDidMount() {
    this.props.fetchRestaurants();
    this.props.fetchVotes();
  }

  renderRestaurants() {
    return _.map(this.props.restaurants, restaurant => {
      return (
        <li className="list-group-item" key={restaurant._id}>
          {/* display every restaurant's title and add link to it */}
          <Link to={`/restaurants/${restaurant._id}`}>
            {restaurant.name}
          </Link>
        </li>
      );
    });
  }

  renderVote() {
    return _.map(this.props.votes, vote => {
      return (
        <tr key={vote._id}>
          <td>{vote.name}</td>
          <td>
            {(() => {
              switch (vote.action) {
                case "disagree" : return <font color="red">Against</font>;
                case "agree" : return <font color="green">For</font>;
                case "default" : return error
              }
            })()}
          </td>
          <td>{vote.restaurant_name}</td>
          <td>
            <Moment format="YYYY/MM/DD HH:mm:ss">{vote.date}</Moment>
          </td>
        </tr>
      );
    });
  }

  renderVotes(){
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
            <th>Restaurant</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {this.renderVote()}
        </tbody>
      </table>
    );
  }

  renderScores(score_arr){
    return _.map(score_arr, score_res => {
      return (
        <tr key={score_res.name}>
          <td>{score_res.rank}</td>
          <td>{score_res.name}</td>
          <td>{score_res.score}</td>
        </tr>
      );
    });
  }

  renderScoreboard(){
    var score_arr = [];
    _.map(this.props.votes, vote => {
      //when it is For
      if(vote.action == "disagree"){
          var name_scoreb_d = vote.restaurant_name;
          var index = _.findIndex(score_arr,
                    function(rest) { return rest.name == name_scoreb_d; });
          //means this element is not in the array
          if(index == -1){
            score_arr.push({name : name_scoreb_d, score : -2 });
          }
          else{
            var new_score = score_arr[index].score - 2
            score_arr[index] = {name : name_scoreb_d, score : new_score};
          }
      }
      //when is is Against
      else{
        var name_scoreb_a = vote.restaurant_name;
        var index = _.findIndex(score_arr,
                  function(rest) { return rest.name == name_scoreb_a; });
        if(index == -1){
          score_arr.push({name : name_scoreb_a, score : 1 });
        }
        else{
          var new_score = score_arr[index].score + 1
          score_arr[index] = {name : name_scoreb_a, score : new_score};
        }
      }
    });

    //sorted the scoreboard arrat ascending
    score_arr = score_arr.sort((a,b) => {
       return a.score < b.score;
    })

    //set the inital ranking to 1
    if(score_arr[0]){
      var ranking_all = 1;
      var ranking_cur = 1;
      score_arr[0].rank = ranking_cur;
      for(var index = 1; index < score_arr.length; index ++){
        var score_rest_prev = score_arr[index];
        var score_rest_cur = score_arr[index-1];
        if(score_rest_cur.score == score_rest_prev.score){
          score_arr[index].rank = ranking_cur;
          ranking_all ++;
        }
        else{
          ranking_all ++;
          ranking_cur = ranking_all;
          score_arr[index].rank = ranking_cur;
        }
      }
    }

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Restaurant</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {this.renderScores(score_arr)}
        </tbody>
      </table>
  );
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
        {this.renderVotes()}
        {this.renderScoreboard()}
      </div>
    );
  }
}

//in order to give the homepage component the restaurants state from reducer
//restaurants will be inside props of homepage
function mapStateToProps(state) {
  return { restaurants : state.restaurants, votes : state.votes };
}


//{ fetchRestaurants } ====
// // Anything returned from this function will end up as props
// on the BookList container
// "function mapDispatchToProps(dispatch) {"
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
//    "return bindActionCreators({ fetchRestaurants: fetchRestaurants }, dispatch);"
// "}"

export default connect(mapStateToProps, { fetchRestaurants, fetchVotes })(Homepage);
