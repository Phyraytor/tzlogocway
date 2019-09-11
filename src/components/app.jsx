var React = require("react");
var ReactDOM = require('react-dom');
var redux = require("redux");
var Provider = require("react-redux").Provider;
var reducer = require("./reducer.jsx").default;
var actions = require("./actions.jsx");
var AppView = require("./appview.jsx");
var axios = require("axios");
var store = require("./store.jsx").default;
const ReactRouterDOM = require("react-router-dom");
const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;
const Link = ReactRouterDOM.Link;
const NavLink = ReactRouterDOM.NavLink;

class App extends React.Component {
  render () {
    return (
      <div> 
        <Provider store={store}>
          <AppView/>
        </Provider>
      </div>
    );
  }
}

module.exports = App;