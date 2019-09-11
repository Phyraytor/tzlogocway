var React     = require("react");
var ReactDOM  = require("react-dom");
var connect   = require("react-redux").connect;
var actions   = require("../actions.jsx");

class RegistrForm extends React.Component {

  hideForm() {
    this.setState({
        formShow: false
    });
  }

  handleSubmit(e) {
    /* create items */
    e.preventDefault();
    const data = new FormData();
    for (let item of newItem) {
      data.append(key, item);
    }
    const _this = this;
    axios.post("/create-" + _this.classMain.props.name + "/", data)
    .then(function (response) {
      //обновляем данные
        if(response.data) {
          _this.hideForm();
        console.log("Вы успешно зарегистрированы!");
        //Чистим поля
        for (let key in _this.refs) {
          _this.refs[key].value = '';
        }

       } else {
         console.log("Логин уже занят!");
       }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <form action = "/signup" method = "POST"> 
        <input name = "login" type = "text"/>
        <input name = "password" type = "password"/>
        <input name = "passwordRepeat" type = "password"/>
        <button class = "button btn btn-info col-7" type="submit">Зарегистрироваться</button> 
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

module.exports = connect(mapStateToProps, actions)(RegistrForm);