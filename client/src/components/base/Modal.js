import React from 'react';
import { Modal, Button } from 'react-bootstrap';
function ModalBase(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      {props.footer && (
        <Modal.Footer>
          <Button variant='secondary' onClick={props.onHide}>
            Tidak
          </Button>
          <Button variant='light' onClick={props.onConfirm}>
            Ya
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default ModalBase;
