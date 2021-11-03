import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button, Card } from 'react-bootstrap';
function TableBase(props) {
  const {
    columns,
    data,
    totalData,
    page,
    limit,
    setPage,
    hideHeader,
    hidePagination,
    search,
    onSearch,
    searchPlaceholder,
    buttonTitle,
    onClickHeader,
  } = props;
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    setTotalPage(Math.ceil(totalData / limit));
  }, [totalData, limit]);

  const getData = (item, h) => {
    const keyData = h.key.split('.');
    if (keyData.length > 1) {
      const innerData = item[keyData[0]];
      return <>{innerData[keyData[1]]}</>;
    } else return <>{item[keyData[0]]}</>;
  };

  const rowHandler = (item, index) => {
    return (
      <tr key={index.toString()}>
        {columns.map((h, index) => {
          if (h.render)
            return (
              <td key={index.toString()} className='px-6 py-4 whitespace-wrap'>
                {h.render(item)}
              </td>
            );
          else
            return (
              <td key={index.toString()} className='px-6 py-4 whitespace-wrap'>
                {getData(item, h)}
              </td>
            );
        })}
      </tr>
    );
  };

  return (
    <Card className='p-5 shadow-sm '>
      <div className='mb-5'>
        {!hideHeader && (
          <div className='d-flex justify-content-end gap-3'>
            <input
              value={search}
              placeholder={searchPlaceholder}
              onChange={onSearch}
            />
            <Button onClick={onClickHeader}>{buttonTitle}</Button>
          </div>
        )}

        <Table responsive>
          <thead>
            <tr>
              {columns &&
                columns.map((item, index) => <th key={index}>{item.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {!data || data.length === 0 ? (
              <p>No Data </p>
            ) : (
              data.map((item, index) => rowHandler(item, index))
            )}
          </tbody>
        </Table>
      </div>
      {!hidePagination && (
        <Pagination className='d-flex justify-content-end'>
          <Pagination.Prev
            disabled={page === 1 ? true : false}
            onClick={() => setPage(page - 1)}
          />
          {Array.from({ length: totalPage }).map((item, index) => (
            <Pagination.Item
              active={index + 1 === page ? true : false}
              onClick={() => {
                setPage(index + 1);
              }}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={page === totalPage ? true : false}
            onClick={() => setPage(page + 1)}
          />
        </Pagination>
      )}
    </Card>
  );
}

export default TableBase;
