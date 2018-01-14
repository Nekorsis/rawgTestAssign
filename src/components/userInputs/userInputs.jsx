import React from 'react';

class UserInputs extends React.PureComponent {
  render () {
    return (
      <div>
        <input
          onChange={this.props.userNameInputHandle}
          placeholder={"ФИО"}
          defaultValue={this.props.editUser ? this.props.editUser.name : ''}
        />
        <input
          onChange={this.props.birthDateInputHandle}
          placeholder={"Дата рождения"}
          defaultValue={this.props.editUser ? this.props.editUser.birthDate : ''}
        />
        <input
          onChange={this.props.adressInputHandle}
          placeholder={"Адрес"}
          defaultValue={this.props.editUser ? this.props.editUser.adress : ''}
        />
        <input
          onChange={this.props.cityInputInputHandle}
          placeholder={"Город"}
          defaultValue={this.props.editUser ? this.props.editUser.city : ''}
        />
        <input
          onChange={this.props.phoneInputHandle}
          placeholder={"Телефон"}
          defaultValue={this.props.editUser ? this.props.editUser.phone : ''}
        />
      </div>
    );
  }
}

export default UserInputs;