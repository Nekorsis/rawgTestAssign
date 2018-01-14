import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserModal = (props) => {
    return (
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onCancel}>{'Отмена'}</Button>
          <Button bsStyle="primary" onClick={props.onSuccsess}>{'Добавить'}</Button>
        </Modal.Footer>
      </Modal>
    );
};

export default UserModal;