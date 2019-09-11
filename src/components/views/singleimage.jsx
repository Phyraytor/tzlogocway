var React     = require("react");
var ReactDOM  = require("react-dom");
var connect   = require("react-redux").connect;
var actions   = require("../actions.jsx");

class SingleImage extends React.Component {
  render() {
    return (
      <div className = "single-image">
        <div class = "closePage">x</div>
        <img src = "{this.props.image}" />
        <div>{ this.props.name }</div>
        <div>{ this.props.description }</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}
 
module.exports = connect(mapStateToProps, actions)(SingleImage);