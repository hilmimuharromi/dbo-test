import React, { useState, useEffect } from 'react';
import { Modal } from '../base';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
function ModalFormCustomer(props) {
  const baseUrl = 'http://localhost:4000';
  const { visible, setVisible, data, onFinish } = props;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (data) {
      setEmail(data.email);
      setName(data.name);
      setAddress(data.address);
    }
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      name,
      address,
    };
    let method = 'post';
    let url = `${baseUrl}/customers`;
    if (data) {
      method = 'put';
      url += `/${data.id}`;
      payload.created = new Date();
    }
    axios(url, {
      method: method,
      data: payload,
    })
      .then((res) => {
        setEmail('');
        setName('');
        setAddress('');
        onFinish();
      })
      .catch((err) => {
        console.log('error save customer', JSON.stringify(err));
      });
  };

  return (
    <Modal
      show={visible}
      onHide={setVisible}
      title={data ? 'Update Customer' : 'Add Customer'}
    >
      <Form onSubmit={onSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Enter email'
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name'
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            as='textarea'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
          />
        </Form.Group>
        <Button type='submit'>Save Customer</Button>
      </Form>
    </Modal>
  );
}

export default ModalFormCustomer;
