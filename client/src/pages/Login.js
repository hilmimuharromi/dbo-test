import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Toast } from 'react-bootstrap';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const url = 'http://localhost:4000';
 

  const onSubmit = (e) => {
    e.preventDefault();
    axios(`${url}/users?email=${email}&&password=${password}`, {
      method: 'get',
    }).then(({ data }) => {
      if(data.length === 0) {
        setError(true)
      } else {
        
        console.log('berhasil login', data);

      }
    });
    console.log('login', email, password);
  };
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card style={{ width: '18rem', padding: '3rem' }}>
            {
              error &&  <Toast onClose={() => setError(false)} show={error} className="d-inline-block m-1" bg="danger" delay={3000} autohide>
              <Toast.Body className={'text-white'}>
                Hello, world! This is a toast message.
              </Toast.Body>
            </Toast>
            }
            <Form onSubmit={onSubmit}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter email' />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
              </Form.Group>
              <Button type='submit'>Login</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
