var React     = require("react");
var ReactDOM  = require("react-dom");
var connect   = require("react-redux").connect;
var actions   = require("../actions.jsx");

class ImagesList extends React.Component {
  render() {
    return (
      <div className = "list-image">
        {
          // this.props.images.map(image => 
          //   <img src = "{image}" />
          // )
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state
  };
}
 
module.exports = connect(mapStateToProps, actions)(ImagesList);