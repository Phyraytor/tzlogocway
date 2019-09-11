var React     = require("react");
var ReactDOM  = require("react-dom");
var connect   = require("react-redux").connect;
var actions   = require("../actions.jsx");

class ImageForm extends React.Component {
  hideForm() {
    this.setState({
        formShow: false
    });
  }

  handleSubmit(e) {
    /* create items */
    e.preventDefault();
    let newItem = {};
    for (let key in this.refs) {
      newItem[key] = this.refs[key].value;
    }
    newItem.image = dateToStr() + "_" + this.refs.image.files[0].name
    const data = new FormData();
    for (let item of newItem) {
      data.append(key, item);
    }
    data.append("file", this.refs.image.files[0]);
    data.append("image", newItem.image); // Не знаю почему, но при удалении этой строки фронт перестаёт подгружать актуальные данные..
    const _this = this;

    axios.post("/create-" + _this.classMain.props.name + "/", data)
    .then(function (response) {
      //обновляем данные
      newItem._id = response.data;
      _this.classMain.setState({
        items: _this.classMain.state.items.concat([newItem])
      });

      //Чистим поля
      for (let key in _this.refs) {
        _this.refs[key].value = '';
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  render() {
    return (
      <form>

        <input name = "image" value = "" type = "file"/>
        <input name = "name" value = "{this.props.name}" type = "text"/>
        <textarea name = "description">{this.props.description}</textarea>
        <button class = "button btn btn-info col-7" onClick={ this.handleSubmit.bind(this) }>Сохранить</button> 
        <button class = "button btn btn-info col-7" onClick={ this.hideForm.bind(this) }>Назад</button> 
      </form>
    );
  }
}
 
function mapStateToProps(state) {
  return {
    ...state
  };
}

module.exports = connect(mapStateToProps, actions)(ImageForm); 