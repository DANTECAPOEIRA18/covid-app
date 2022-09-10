/* eslint-disable max-len */
import React from 'react';
import './Posts.css';
import {
  Table, Input, Modal,
} from 'antd';
import usePosts from './usePosts';
import withAuth from '../../utils/withAuth';
// import Button from '../../components/ButtonMenu';

function PostsView() {

  const {
    columns, listCountries, filterTable, columnsModal, listCountriesDetail, onCancel, isModalOpen, Country,
  } = usePosts();
  return (
    <>
      <Modal title={Country} visible={isModalOpen} onCancel={onCancel} okButtonProps={{ hidden: true }}>
        <Table
          columns={columnsModal}
          dataSource={listCountriesDetail}
          style={{
            width: '200vw',
          }}
          pagination={{ pageSize: 4 }}
          rowKey={(record) => `${record.temperature}`}
        />
      </Modal>
      <Input placeholder="Filtro por pais" onChange={filterTable} />
      <div className="general-container-post">
        <div className="div2-post">
          <Table
            columns={columns}
            dataSource={listCountries}
            style={{
              width: '300vw',
            }}
            pagination={{ pageSize: 4 }}
            rowKey={(record) => `${record.temperature}`}
          />
        </div>
      </div>
    </>
  );

}

export default withAuth(PostsView);
