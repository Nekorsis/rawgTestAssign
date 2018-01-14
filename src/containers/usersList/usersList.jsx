import React from 'react';
import { Panel, Button, PageHeader, Modal } from 'react-bootstrap';
import User from './../../components/user/user.jsx';
import UserInputs from './../../components/userInputs/userInputs.jsx';
import UsersTable from './../../components/usersTable/usersTable.jsx';
import UserModal from './../../components/userModals/userModals.jsx';
import uuidv1 from 'uuid/v1';

import './../../styles/index.css';

class UsersList extends React.PureComponent {
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

  birthDateInputHandle = (date) => {
    const curr_date = date.getDate();
    const curr_month = date.getMonth() + 1;
    const curr_year = date.getFullYear();
    this.setState({
      birthDateInputValue: `${curr_year}/${curr_month}/${curr_date}`,
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
          {'Rawg test assign '} 
          <Button onClick={this.openModalHandler} bsStyle="primary" >
            {' Добавить пользователя'}
          </Button>
        </PageHeader>
        <UserModal
          show={this.state.isAddUserModalOpen}
          onHide={this.openModalHandler}
          title={'Добавить пользователя'}
          onSuccsess={this.addUser}
          onCancel={this.openModalHandler}
        >
          <UserInputs
            userNameInputHandle={this.userNameInputHandle}
            birthDateInputHandle={this.birthDateInputHandle}
            adressInputHandle={this.adressInputHandle}
            cityInputInputHandle={this.cityInputInputHandle}
            phoneInputHandle={this.phoneInputHandle}
          />
        </UserModal>
        <UserModal
          show={this.state.isEditModalOpen}
          onHide={this.openEditModal}
          title={'Отредактировать пользователя'}
          onSuccsess={this.editUser}
          onCancel={this.openEditModal}
        >
          <UserInputs
            userNameInputHandle={this.userNameInputHandle}
            birthDateInputHandle={this.birthDateInputHandle}
            adressInputHandle={this.adressInputHandle}
            cityInputInputHandle={this.cityInputInputHandle}
            phoneInputHandle={this.phoneInputHandle}
            editUser={this.state.editUser}
          />
        </UserModal>
        <UsersTable
          usersData={usersData}
          openEditModal={this.openEditModal}
          deleteUser={this.deleteUser}
        />
      </Panel>
    );
  }
}

export default UsersList;