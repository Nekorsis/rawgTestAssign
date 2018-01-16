import React from 'react';
import { Grid, Panel, Button, PageHeader } from 'react-bootstrap';
import uuidv1 from 'uuid/v1';
import UsersTable from './../../components/usersTable/usersTable.jsx';
import UserModal from './../../components/userModals/userModals.jsx';


import './../../styles/index.css';

class UsersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      users: null,
      editUser: null,
      isEditing: false,
    };
  }

  addUser = (inputsData) => {
    const users = localStorage.getItem('usersList') ? JSON.parse(localStorage.getItem('usersList')) : [];
    const User = {
      id: uuidv1(),
      name: inputsData.userNameInputValue,
      birthDate: inputsData.birthDateInputValue,
      adress: inputsData.adressInputValue,
      city: inputsData.cityInputValue,
      phone: inputsData.phoneInputValue,
    };
    users.push(User);
    localStorage.setItem('usersList', JSON.stringify(users));
    this.closeEditModal();
  };

  deleteUser = (userId) => {
    const users = localStorage.getItem('usersList') ? JSON.parse(localStorage.getItem('usersList')) : [];
    const updatedUsers = users.filter(user => user.id !== userId);
    localStorage.setItem('usersList', JSON.stringify(updatedUsers));
    this.setState({
      users: updatedUsers,
    });
  };

  openAddModal = () => {
    this.setState(() => ({
      isModalOpen: true,
    }));
  };

  openEditModal = (user) => {
    this.setState(() => ({
      isEditing: true,
      isModalOpen: true,
      editUser: user,
    }));
  };

  closeEditModal = () => {
    this.setState(() => ({
      isEditing: false,
      isModalOpen: false,
    }));
  };

  editUser = (inputsData) => {
    const user = this.state.editUser;
    const users = localStorage.getItem('usersList') ? JSON.parse(localStorage.getItem('usersList')) : [];
    let userIndex;
    users.forEach((item, index) => {
      if (item.id === user.id) {
        userIndex = index;
      }
    });
    const User = {
      id: user.id,
      name: inputsData.userNameInputValue,
      birthDate: inputsData.birthDateInputValue,
      adress: inputsData.adressInputValue,
      city: inputsData.cityInputValue,
      phone: inputsData.phoneInputValue,
    };
    const updatedUsers = users;
    updatedUsers[userIndex] = User;
    localStorage.setItem('usersList', JSON.stringify(updatedUsers));
    this.setState({
      users: updatedUsers,
    });
    this.closeEditModal();
  };

  render() {
    const usersData = localStorage.getItem('usersList') ? JSON.parse(localStorage.getItem('usersList')) : null;
    return (
      <Grid>
        <Panel>
          <PageHeader>
            {'Rawg test assign '}
            <Button onClick={this.openAddModal} bsStyle="primary" >
              {' Добавить пользователя'}
            </Button>
          </PageHeader>
          <UserModal
            editUser={this.state.editUser}
            show={this.state.isModalOpen}
            onHide={this.closeEditModal}
            title={this.state.isEditing === false ? 'Добавить пользователя' : 'Отредактировать пользователя'}
            onSuccsess={this.state.isEditing === false ? this.addUser : this.editUser}
            onCancel={this.closeEditModal}
          />
          <UsersTable
            usersData={usersData}
            openEditModal={this.openEditModal}
            deleteUser={this.deleteUser}
          />
        </Panel>
      </Grid>
    );
  }
}

export default UsersList;
