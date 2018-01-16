import React from 'react';
import { Modal, Button, Label } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import InputMask from 'react-input-mask';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameInputValue: '',
      birthDateInputValue: new Date(),
      adressInputValue: '',
      cityInputValue: '',
      phoneInputValue: '',
      errors: null,
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.editUser !== null) {
      this.setState({
        userNameInputValue: nextProps.editUser.name,
        birthDateInputValue: nextProps.editUser.birthDate,
        adressInputValue: nextProps.editUser.adress,
        cityInputValue: nextProps.editUser.city,
        phoneInputValue: nextProps.editUser.phone,
      });
    };
  };

  validators = {
    userNameInputValue: (form) => form.userNameInputValue === '' ? 'name_error' : undefined,
    birthDateInputValue: (form) => form.birthDateInputValue === '' ? 'birthDate_error' : undefined,
    adressInputValue: (form) => form.adressInputValue === '' ? 'adress_error' : undefined,
    cityInputValue: (form) => form.cityInputValue === '' ? 'city_error' : undefined,
    phoneInputValue: (form) => form.phoneInputValue === '' ? 'phone_error' : undefined,
  };

  userNameInputHandle = (e) => {
    this.setState({
      userNameInputValue: e.target.value,
    });
  };

  birthDateInputHandle = (date) => {
    this.setState({
      birthDateInputValue: date,
    });
  };

  adressInputHandle = (e) => {
    this.setState({
      adressInputValue: e.target.value,
    });
  };

  cityInputInputHandle = (e) => {
    this.setState({
      cityInputValue: e.target.value,
    });
  };

  phoneInputHandle = (e) => {
    this.setState({
      phoneInputValue: e.target.value,
    });
  };

  validateInputs = (form, validators) => {
    return Object.keys(form)
      .map(key => {
        const validator = validators[key]
        return validator(form);
      })
      .filter(Boolean)
  };

  getFromState = () => {
    return {
      userNameInputValue: this.state.userNameInputValue,
      birthDateInputValue: this.state.birthDateInputValue,
      adressInputValue: this.state.adressInputValue,
      cityInputValue: this.state.cityInputValue,
      phoneInputValue: this.state.phoneInputValue,
    };
  };

  resetModalState = () => {
    this.setState({
      userNameInputValue: '',
      birthDateInputValue: new Date(),
      adressInputValue: '',
      cityInputValue: '',
      phoneInputValue: '',
      errors: null,
    });
  };

  onAddSuccsess = () => {
    this.setState(() => {
      return { errors: this.validateInputs(this.getFromState(), this.validators) }
    });
    const localErrors =  this.validateInputs(this.getFromState(), this.validators);
    if (localErrors && localErrors.length === 0) {
      this.props.onSuccsess(this.getFromState());
      this.resetModalState();
      return;
    }
    console.log('user cannot be created');
  };

  onEditSuccsess =() => {
    this.setState(() => {
      return { errors: this.validateInputs(this.getFromState(), this.validators) }
    });
    const localErrors =  this.validateInputs(this.getFromState(), this.validators);
    if (localErrors && localErrors.length === 0) {
      this.props.onSuccsess(this.getFromState());
      this.resetModalState();
      return;
    }
  }

  onCancel = () => {
    this.resetModalState();
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.errors && this.state.errors.includes('name_error') ? <Label bsStyle="danger">Введите ФИО</Label> : null}
          <input
            maxLength={100}
            type={"text"}
            className={"form-control"}
            value={this.state.userNameInputValue}
            onChange={this.userNameInputHandle}
            placeholder={"ФИО"}
          />
          {this.state.errors && this.state.errors.includes('birthDate_error') ? <Label bsStyle="danger">Выберите дату</Label> : null}
          <div>
            <DatePicker
              required={true}
              onChange={this.birthDateInputHandle}
              showNeighboringMonth={false}
              value={new Date(this.state.birthDateInputValue)}
            />
          </div>
          {this.state.errors && this.state.errors.includes('city_error') ? <Label bsStyle="danger">Введите город</Label> : null}
          <input
            maxLength={100}
            className={"form-control"}
            value={this.state.cityInputValue}
            onChange={this.cityInputInputHandle}
            placeholder={"Город"}
          />
          {this.state.errors && this.state.errors.includes('adress_error') ? <Label bsStyle="danger">Введите адрес</Label> : null}
          <input
            maxLength={100}
            className={"form-control"}
            value={this.state.adressInputValue}
            onChange={this.adressInputHandle}
            placeholder={"Адрес"}
          />
          {this.state.errors && this.state.errors.includes('phone_error') ? <Label bsStyle="danger">Введите телефон</Label> : null}
          <InputMask
            className={"form-control"}
            onChange={this.phoneInputHandle}
            defaultValue={this.state.phoneInputValue}
            placeholder={"Телефон"}
            mask={'+7\\ 999 999 99 99'}
            maskChar=" "
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onCancel}>{'Отмена'}</Button>
          <Button bsStyle="primary" onClick={this.onAddSuccsess}>{'Добавить'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default UserModal;