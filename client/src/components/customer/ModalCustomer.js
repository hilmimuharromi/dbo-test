import React, { useState, useEffect } from 'react';
import { Modal, Table } from '../base';
import axios from 'axios';
import { Form, Row, Col } from 'react-bootstrap';
import moment from 'moment'
function ModalCustomer(props) {
  const baseUrl = 'http://localhost:4000';
  const { visible, setVisible, data } = props;
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    axios(`${baseUrl}/orders?customers=${data.id}`).then((res) => {
      setOrders(res.data);
    }).catch((err) => {
      console.log('error get order', JSON.stringify(err))
    })
  };

  useEffect(() => {
    getOrders();
    //eslint-disable-next-line
  }, [data.id]);

  const columns = [
    {
        title: 'Products',
        key: 'items',
        render: (item) => (
            item.items.map((i) => <p>{i.name} - Rp {i.price}</p>)
        )
      },
      {
          title: "Total",
          key: 'name',
          render: (item) => {
              let totalPrice = 0
              item.items.map((i) => totalPrice += i.price)
              return (
                  totalPrice
              )
          }
      }, {
          title: 'status',
          key: "status"
      },  {
        title: 'Date',
        key: 'created',
        render: (item) => <p>{moment(item.created).format('DD-MM-YYYY hh:mm')}</p>
      },
  ]

  return (
    <Modal
      show={visible}
      onHide={setVisible}
      title={`Detail Cutomer ${data.name}`}
    >
      <div>
        <Form>
          <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
            <Form.Label column sm='2'>
              Email
            </Form.Label>
            <Col sm='10'>
              <Form.Control
                plaintext
                readOnly
                disabled
                value={data.email}
                defaultValue='email@example.com'
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
              value={data.address}
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
          <h6>History Order</h6>
          </div>
      <Table 
      hideHeader={true}
      columns={columns}
          data={orders}
          hidePagination={true}
        //   page={page}
        //   setPage={setPage}
        //   totalData={totalData}
        //   limit={limit}
           />
    </Modal>
  );
}

export default ModalCustomer;
