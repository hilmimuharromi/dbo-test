import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

function NavbarComponent() {
  const history = useHistory();

  const onLogout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };
  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container>
        {/* <Navbar.Brand href='#home'>DEPOGUNA</Navbar.Brand> */}
        <Navbar.Brand href='#home'>
          <img
            src='https://dbo.id/wp-content/themes/dbo/assets/images/dbo-logo_Colour2.png'
            // width="100"
            height='80'
            className='d-inline-block align-top'
            alt='React Bootstrap logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='d-flex justify-content-sm-end  gap-3 ' style={{ width: '100%' }}>
            
              <Link className='link' to='/customer'>
                <h5>Customer</h5>
              </Link>

              <Link className='link' to='/order'>
                <h5>Order</h5>
              </Link>
            
            <Button size="sm" variant='danger' onClick={onLogout}>
              <h5>Logout</h5>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
