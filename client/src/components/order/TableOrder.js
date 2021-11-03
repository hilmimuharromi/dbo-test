import React, { useState, useEffect } from 'react';
import { Table, ModalConfirm } from '../base';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import ModalDetail from './ModalDetail';
import ModalFormOrder from './ModalFormOrder';
import moment from 'moment';

function TableCustomer() {
  const baseUrl = 'http://localhost:4000';
  const limit = 3
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState('');
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false)
  const [search, setSearch] = useState('');
  const columns = [
    {
        title: 'Invoice',
        key: 'invoice',
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
    {
      title: 'Action',
      key: 'email',
      render: (item) => (
        <div className='d-flex gap-3'>
          <Button
            onClick={() => {
              setCurrentData(item);
              setVisibleDetail(true);
            }}
          >
            Detail
          </Button>
          <Button 
          variant="secondary"
           onClick={() => {
            setCurrentData(item);
            setVisibleForm(true);
          }}
          >Edit</Button>
          <Button
          variant="danger"
            onClick={() => {
              setCurrentData(item);
              setVisibleDelete(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const getData = () => {
    let query = `_expand=customers&_page=${page}&_limit=${limit}`;
    if (search) {
      query += `&invoice_like=${search}`;
    }
    axios.get(`${baseUrl}/orders?${query}`).then((res) => {
      setTotalData(res.headers['x-total-count']);
      setData(res.data);
    }).catch((err) => {
      console.log('error get order', JSON.stringify(err))
    })
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, [page, search]);

  const deleteCustomer = (data) => {
    axios.delete(`${baseUrl}/orders/${currentData.id}`).then((res) => {
    setPage(1)
      getData();
      setVisibleDelete(false);
      setCurrentData('');
    }).catch((err) => {
      console.log('error delete order', JSON.stringify(err))
    })
  };

  return (
    <>
    <ModalFormOrder
    visible={visibleForm}
    setVisible={setVisibleForm}
    data={currentData}
    onFinish={() => {
        getData()
        setVisibleForm(false)
        setCurrentData('')
    }}
     />
      <ModalConfirm
        visible={visibleDelete}
        setVisible={setVisibleDelete}
        title='Delete Confirmation'
        message={`Are you sure to delete this order ${currentData.name} ?`}
        onConfirm={deleteCustomer}
      />
      <ModalDetail
        visible={visibleDetail}
        setVisible={setVisibleDetail}
        data={currentData}
      />
      <Container>
        
        <Table
          columns={columns}
          data={data}
          page={page}
          setPage={setPage}
          totalData={totalData}
          limit={limit}
          search={search}
          onSearch={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
          onClickHeader={() => {
            setCurrentData('')
            setVisibleForm(true)}}
          searchPlaceholder="Search order"
          buttonTitle="Add order"
        />
      </Container>
    </>
  );
}

export default TableCustomer;
