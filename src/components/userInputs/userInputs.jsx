import React from 'react';
import{
  Label,
  InputGroup,
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
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
    const { formErrors } = this.props;
    return (
      <InputGroup>
        <FormGroup>
          {formErrors && formErrors.includes('name_error') ? <Label bsStyle="danger">Введите имя</Label> : null}
          <FormControl
            maxLength={100}
            onChange={this.props.userNameInputHandle}
            type={"text"}
            placeholder={"ФИО"}
            defaultValue={this.props.editUser ? this.props.editUser.name : ''}
          />
        </FormGroup>
        <div>
          {formErrors && formErrors.includes('birthDate_error') ? <Label bsStyle="danger">Выберите дату рождения</Label> : null}
        </div>
        <DatePicker
            required={true}
            onChange={this.props.birthDateInputHandle}
            showNeighboringMonth={false}
            value={new Date()}
          />
        <FormGroup>
          {formErrors && formErrors.includes('adress_error') ? <Label bsStyle="danger">Введите адрес</Label> : null}
          <FormControl
            maxLength={100}
            type={"text"}
            onChange={this.props.adressInputHandle}
            placeholder={"Адрес"}
            defaultValue={this.props.editUser ? this.props.editUser.adress : ''}
          />
        </FormGroup>
        <FormGroup>
          {formErrors && formErrors.includes('city_error') ? <Label bsStyle="danger">Введите город</Label> : null}
          <FormControl
            maxLength={100}
            type="text"
            onChange={this.props.cityInputInputHandle}
            placeholder={"Город"}
            defaultValue={this.props.editUser ? this.props.editUser.city : ''}
          />
        </FormGroup>
          {formErrors && formErrors.includes('phone_error') ? <Label bsStyle="danger">Введите номер телефона</Label> : null}
          <InputMask
            className={"form-control"}
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