import React from 'react';
import { Table, Panel, Button, PageHeader, Modal } from 'react-bootstrap';
import User from './../../components/user/user.jsx';
import UserInputs from './../../components/userInputs/userInputs.jsx';
import uuidv1 from 'uuid/v1';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddUserModalOpen: false,
      isEditModalOpen: false,
      userNameInputValue: '',
      birthDateInputValue: '',
      adressInputValue: '',
      cityInputValue: '',
      phoneInputValue: '',
      users: null,
      editUser: null,
    };
  }

  resetInputState = () => {
    this.setState({
      userNameInputValue: '',
      birthDateInputValue: '',
      adressInputValue: '',
      cityInputValue: '',
      phoneInputValue: '',
    })
  };

  openModalHandler = () => {
    this.setState((prevState) => {
      return {isAddUserModalOpen: !prevState.isAddUserModalOpen}
    });
  };

  userNameInputHandle = (e) => {
    this.setState({
      userNameInputValue: e.target.value,
    });
  };

  birthDateInputHandle = (e) => {
    this.setState({
      birthDateInputValue: e.target.value,
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

  addUser = () => {
    const users = localStorage.getItem('usersList') ? JSON.parse(localStorage.getItem('usersList')) : [];
    const User = {
      id: uuidv1(),
      name: this.state.userNameInputValue,
      birthDate: this.state.birthDateInputValue,
      adress: this.state.adressInputValue,
      city: this.state.cityInputValue,
      phone: this.state.phoneInputValue,
    };
    users.push(User);
    localStorage.setItem('usersList', JSON.stringify(users));
    this.resetInputState();
    this.openModalHandler();
  };

  deleteUser = (userId) => {
    const users = localStorage.getItem('usersList') ? JSON.parse(localStorage.getItem('usersList')) : [];
    const updatedUsers = users.filter(user => {
      return user.id !== userId;
    })
    localStorage.setItem('usersList', JSON.stringify(updatedUsers));
    this.setState({
      users: updatedUsers,
    });
  };

  openEditModal = (user) => {
    this.setState((prevState) => {
      return {
        isEditModalOpen: !prevState.isEditModalOpen,
        editUser: user,
       };
    });
  };

  editUser = () => {
    const user = this.state.editUser;
    const users = localStorage.getItem('usersList') ? JSON.parse(localStorage.getItem('usersList')) : [];
    let userIndex;
    users.forEach((item, index) => {
      if (item.id === user.id) {
        userIndex = index;
        return;
      };
    });
    const User = {
      id: user.id,
      name: this.state.userNameInputValue !== '' ? this.state.userNameInputValue : user.name,
      birthDate: this.state.birthDateInputValue !== '' ? this.state.birthDateInputValue : user.birthDate,
      adress: this.state.adressInputValue !== '' ? this.state.adressInputValue : user.adress,
      city: this.state.cityInputValue !== '' ? this.state.cityInputValue : user.city,
      phone: this.state.phoneInputValue !== '' ? this.state.phoneInputValue : user.phone,
    };
    let updatedUsers = users;
    updatedUsers[userIndex] = User;
    localStorage.setItem('usersList', JSON.stringify(updatedUsers));
    this.setState({
      users: updatedUsers,
    });
    this.openEditModal();
  };

  render () {
    const usersData = localStorage.getItem('usersList') ? JSON.parse(localStorage.getItem('usersList')) : null;
    return (
      <Panel>
        <PageHeader>
          {'Rawr test assign '} 
          <Button onClick={this.openModalHandler} bsStyle="primary" >
            {' Добавить пользователя'}
          </Button>
        </PageHeader>
        <Modal show={this.state.isAddUserModalOpen} onHide={this.openModalHandler}>
          <Modal.Header>
            <Modal.Title>{'Добавить пользователя'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserInputs
            userNameInputHandle={this.userNameInputHandle}
            birthDateInputHandle={this.birthDateInputHandle}
            adressInputHandle={this.adressInputHandle}
            cityInputInputHandle={this.cityInputInputHandle}
            phoneInputHandle={this.phoneInputHandle}
          />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.openModalHandler}>{'Отмена'}</Button>
            <Button bsStyle="primary" onClick={this.addUser}>{'Добавить'}</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isEditModalOpen} onHide={this.openEditModal}>
          <Modal.Header>
            <Modal.Title>{'Отредактировать пользователя'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserInputs
              userNameInputHandle={this.userNameInputHandle}
              birthDateInputHandle={this.birthDateInputHandle}
              adressInputHandle={this.adressInputHandle}
              cityInputInputHandle={this.cityInputInputHandle}
              phoneInputHandle={this.phoneInputHandle}
              editUser={this.state.editUser}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.openEditModal}>{'Отмена'}</Button>
            <Button bsStyle="primary" onClick={this.editUser}>{'Добавить'}</Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Фио</th>
              <th>Дата рождения</th>
              <th>Адрес</th>
              <th>Город</th>
              <th>Телефон</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.birthDate}</td>
                  <td>{user.adress}</td>
                  <td>{user.city}</td>
                  <td>{user.phone}</td>
                  <td onClick={() => {this.openEditModal(user)}}>{'Редактировать'}</td>
                  <td onClick={() => {this.deleteUser(user.id)}}>{'Удалить'}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

export default UsersList;