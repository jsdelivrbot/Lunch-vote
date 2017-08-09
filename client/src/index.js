import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";
import Homepage from "./components/homepage";
import Restaurants_new from "./components/restaurants_new";
import Restaurants_show from "./components/restaurants_show";
import Restaurants_edit from "./components/restaurants_edit";

//middleware which deals with promise action
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        {/* which choose the first url that applies preventing conflict */}
        <Switch>
          <Route path="/restaurants/:id/edit" component={Restaurants_edit} />
          <Route path="/restaurants/new" component={Restaurants_new} />
          <Route path="/restaurants/:id" component={Restaurants_show} />
          <Route path="/" component={Homepage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
