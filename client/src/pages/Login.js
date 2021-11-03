import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form, Toast } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const url = 'http://localhost:4000';
  const history = useHistory();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (user) {
      history.push('/');
    }
    //eslint-disable-next-line
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    axios(`${url}/users?email=${email}&&password=${password}`, {
      method: 'get',
    })
      .then(({ data }) => {
        if (data.length === 0) {
          setError(true);
        } else {
          localStorage.setItem('user', data[0].email);
          history.push('/');
        }
      })
      .catch((err) => {
        setError(true);
      });
  };
  return (
    <Container className='pt-5 z-index-1 d-flex align-items-center flex-column justify-content-center '>
      <Card style={{ width: '18rem', padding: '3rem' }}>
        <img
          src='https://dbo.id/wp-content/themes/dbo/assets/images/dbo-logo_Colour2.png'
          width='200'
          className='d-inline-block align-top mb-5'
          alt='DBO LOGO'
        />
        <Form onSubmit={onSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Enter email'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
            />
          </Form.Group>
          <Button type='submit' className='w-100 mt-3'>
            Login
          </Button>
        </Form>
      </Card>
      <Toast
        onClose={() => setError(false)}
        show={error}
        className='d-inline-block m-1'
        bg='danger'
        delay={3000}
        autohide
      >
        <Toast.Body className={'text-white'}>
          ooops, cek email dan password anda
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default Login;
