var React = require("react");
var ReactDOM  = require("react-dom");
var connect = require("react-redux").connect;
var actions = require("./actions.jsx");

var ImagesList = require("./views/imageslist.jsx");
var SingleImage = require("./views/singleimage.jsx");
var ImageForm = require("./views/imageform.jsx");
var RegistrForm = require("./views/registrform.jsx");
var EnterForm = require("./views/enterform.jsx");

const ReactRouterDOM = require("react-router-dom");
const Switch = ReactRouterDOM.Switch;
const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const NavLink = ReactRouterDOM.NavLink;

class AppView extends React.Component{
  render(){
    return ( 
     <Router> 
      <main>
        <header>
          <ul>
            <li>
              <NavLink to="/enter/">Войти</NavLink>
            </li>            
            <li>
              <NavLink to="/add-image/" >Добавить изображение</NavLink>
            </li>            
            <li>
              <NavLink to="/">Все изображения</NavLink>
            </li>
            <li>
              <NavLink to="/registr">Все изображения</NavLink>
            </li>
          </ul>
        </header>    
        <Switch>
          <Route exact path="/" children={()=><ImagesList type = "all" />}/>
          <Route path="/my-images/"  children={()=><ImagesList type = "my" />}/>
          <Route path="/image/:id" component={SingleImage}/>
          <Route path="/add-image/"  component={ImageForm} />
          <Route path="/registr/"  component={RegistrForm} />
          <Route path="/enter/"  component={EnterForm} />
        </Switch>
        </main>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}
 
module.exports = connect(mapStateToProps, actions)(AppView);