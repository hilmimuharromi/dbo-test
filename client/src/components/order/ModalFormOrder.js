import React, { useState, useEffect } from 'react';
import { Modal } from '../base';
import { Button, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';
function ModalFormCustomer(props) {
  const baseUrl = 'http://localhost:4000';
  const { visible, setVisible, data, onFinish } = props;
  const [items, setItems] = useState([]);
  const [customersId, setCustomersId] = useState('');
  const [invoice, setInvoice] = useState('');
  const [status, setStatus] = useState('')

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')

  useEffect(() => {
    if (data) {
      setItems(data.items);
      setCustomersId(data.customersId);
      setInvoice(data.invoice);
      setStatus(data.status)
    } else {
      setItems([]);
      setCustomersId('');
      setInvoice('');
      setStatus('')
    }
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      customersId,
      invoice,
      items,
      status
    };
    let method = 'post';
    let url = `${baseUrl}/orders`;
    if (data) {
      method = 'put';
      url += `/${data.id}`;
      payload.created = new Date();
    }
    axios(url, {
      method: method,
      data: payload,
    }).then((res) => {
      setCustomersId('');
      setInvoice('');
      setStatus('')
      onFinish();
    }).catch((err) => {
      console.log('error save order', JSON.stringify(err))
    })
  };

  const addProduct = () => {
    setItems([...items, {name, price, quantity, unit}])
    setUnit('')
    setName('')
    setPrice('')
    setQuantity('')
  }

  const deleteProduct = (i) => {
    const newItems = items.filter((item, index) => index !== i)
    setItems(newItems)
  }

  return (
    <Modal
      show={visible}
      onHide={setVisible}
      title={data ? 'Update Order' : 'Add Order'}
    >
      <Form onSubmit={onSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Customer Id</Form.Label>
          <Form.Control
            value={customersId}
            onChange={(e) => setCustomersId(e.target.value)}
            type='text'
            placeholder='Customer Id'
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Invoice</Form.Label>
          <Form.Control
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
            placeholder='Invoice'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Status</Form.Label>
          <Form.Control
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder='Status'
          />
        </Form.Group>
        <p>List Products</p>
        <ListGroup>
          {
            items.map((item, index) => (
              <ListGroup.Item>{item.name} - Rp {item.price} /{item.unit} - quantity : {item.quantity}  <Button variant="danger" onClick={() => deleteProduct(index)}>Delete</Button> </ListGroup.Item>
            ))
          }
        </ListGroup>
        <div className="p-5 mx-5 d-flex flex-column gap-1 align-items-center ">
        <input  placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
        <input placeholder="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input placeholder="unit"  value={unit} onChange={(e) => setUnit(e.target.value)}/>
        <Button variant="secondary" className="w-50" onClick={addProduct}>Add Product</Button>
        </div>
        <div className="d-flex justify-content-center">
        <Button type='submit' className="w-50">Save Order</Button>
        </div>
      </Form>
    </Modal>
  );
}

export default ModalFormCustomer;
