import React from 'react';
import {
  Table, Button, Modal, Checkbox, Form, Input, InputNumber, Row,
} from 'antd';
import './Users.css';
import useUsers from './useUsers';
import withAuth from '../../utils/withAuth';

function UserView() {

  const {
    columns, isModalOpen, showModal, onFinish, onFinishFailed, onCancel, listUsers,
  } = useUsers();
  return (
    <>
      <Modal title="Agregar Sintomas" visible={isModalOpen} onCancel={onCancel} okButtonProps={{ hidden: true }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombres"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Apellidos"
            name="lastName"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Temperatura"
            name="temperature"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label="Sintomas" name="headAche" valuePropName="checked" wrapperCol={{ span: 16 }}>
            <Row>
              <Checkbox>Dolor de Cabeza</Checkbox>
            </Row>
          </Form.Item>
          <Form.Item name="fever" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Row>
              <Checkbox>Fiebre</Checkbox>
            </Row>
          </Form.Item>
          <Form.Item name="cough" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Row>
              <Checkbox>Toz Seca</Checkbox>
            </Row>
          </Form.Item>
          <Form.Item name="pain" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Row>
              <Checkbox>Dolor de Musculos</Checkbox>
            </Row>
          </Form.Item>
          <Form.Item name="breathe" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Row>
              <Checkbox>Dificultad para Respirar</Checkbox>
            </Row>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="general-container-user">
        <div className="div2-user">
          <Table
            columns={columns}
            dataSource={listUsers}
            // scroll={{ y: 440 }}
            style={{
              width: '300vw',
            }}
            pagination={{ pageSize: 4 }}
            rowKey={(record) => `${record.temperature}`}
          />
        </div>
      </div>
      <Button type="primary" className="center-button" onClick={showModal}>
        Agregar Usuario
      </Button>
    </>
  );

}

export default withAuth(UserView);
