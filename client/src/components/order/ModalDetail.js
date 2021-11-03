import React from 'react';
import { Modal, Table } from '../base';
import { Form, Row, Col } from 'react-bootstrap';
function ModalCustomer(props) {
  const { visible, setVisible, data } = props;

  const columns = [
    {
        title: 'Name',
        key: 'name',
      },
      {
          title: "Price",
          key: 'price',
         
      }, {
          title: 'Quantity',
          key: "quantity"
      }, {
        title: 'Unit',
        key: "unit"

      }
  ]

  return (
    <Modal
      show={visible}
      onHide={setVisible}
      title={`Detail Orders Invoice ${data.invoice}`}
    >
      <div>
        <Form>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              Name
            </Form.Label>
            <Col sm='10'>
              <Form.Control
                plaintext
                readOnly
                disabled
                value={data && data.customers.name}
                defaultValue={"tes@mail.com"}

               
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              Email
            </Form.Label>
            <Col sm='10'>
              <Form.Control
                plaintext
                readOnly
                disabled
                value={data && data.customers.email}
                defaultValue={"tes@mail.com"}
             
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className='mb-3'
            controlId='formPlaintextPassword'
          >
            <Form.Label column sm='2'>
              Address
            </Form.Label>
            <Col sm='10'>
              <Form.Control
              value={data && data.customers.address}
              disabled
                as='textarea'
                placeholder='Leave a comment here'
                style={{ height: '100px' }}
              />
            </Col>
          </Form.Group>
        </Form>
      </div>
      <div>
          <h6>List Products</h6>
          </div>
      <Table 
      hideHeader={true}
      columns={columns}
          data={data.items}
          hidePagination={true}
           />
    </Modal>
  );
}

export default ModalCustomer;
