import React from 'react';
import { InputGroup, ButtonToolbar, DropdownButton, MenuItem, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import InputMask from 'react-input-mask';

class UserInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInputValidation: true,
      dateInputvalidation: true,
      adressInputValidation: true,
      cityInputValidation: true,
      phoneInputValidation: true,
    };
  };
  render () {
    return (
      <InputGroup>
        <FormGroup validationState="error">
          <FormControl
            maxLength={100}
            onChange={this.props.userNameInputHandle}
            type={"text"}
            placeholder={"ФИО"}
            defaultValue={this.props.editUser ? this.props.editUser.name : ''}
          />
        </FormGroup>
        <DatePicker
          required={true}
          onChange={this.props.birthDateInputHandle}
          showNeighboringMonth={false}
          value={new Date()}
        />
        <FormGroup validationState="error">
          <FormControl
            maxLength={100}
            type={"text"}
            onChange={this.props.adressInputHandle}
            placeholder={"Адрес"}
            defaultValue={this.props.editUser ? this.props.editUser.adress : ''}
          />
        </FormGroup>
        <FormGroup validationState="error">
          <FormControl
            maxLength={100}
            type="text"
            onChange={this.props.cityInputInputHandle}
            placeholder={"Город"}
            defaultValue={this.props.editUser ? this.props.editUser.city : ''}
          />
        </FormGroup>
        <InputMask
          onChange={this.props.phoneInputHandle}
          defaultValue={this.props.editUser ? this.props.editUser.phone : ''}
          placeholder={"Телефон"}
          mask={'+7\\ 999 999 99 99'}
          maskChar=" "
        />
      </InputGroup>
    );
  }
}

export default UserInputs;