import React from 'react';
import { Table } from 'react-bootstrap';

const UsersTable = (props) => {
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Фио</th>
          <th>Дата рождения</th>
          <th>Адрес</th>
          <th>Город</th>
          <th>Телефон</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        {props.usersData ? props.usersData.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.birthDate}</td>
              <td>{user.adress}</td>
              <td>{user.city}</td>
              <td>{user.phone}</td>
              <td onClick={() => { props.openEditModal(user); }}>Редактировать</td>
              <td onClick={() => { props.deleteUser(user.id); }}>Удалить</td>
            </tr>
          );
        }) : null}
      </tbody>
    </Table>
  );
};

export default UsersTable;
