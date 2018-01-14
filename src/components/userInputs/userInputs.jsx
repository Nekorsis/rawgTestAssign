import React from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

class UserInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hey: null,
    };
  };
  render () {
    return (
      <div>
        <input
          maxLength={100}
          onChange={this.props.userNameInputHandle}
          placeholder={"ФИО"}
          defaultValue={this.props.editUser ? this.props.editUser.name : ''}
        />
        <DatePicker
          required={true}
          onChange={this.props.birthDateInputHandle}
          value={new Date()}
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