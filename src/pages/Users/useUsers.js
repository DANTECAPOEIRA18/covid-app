import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Form, message } from 'antd';
import { useHistory } from 'react-router-dom';
import userActions from '../../state/users/actions';

const useUsers = () => {

  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const [listUsers, setListUsers] = useState([]);
  const UsersList = useSelector(({ userReducer }) => userReducer.listUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {

    setIsModalOpen(true);

  };

  useEffect(() => {

    setListUsers(UsersList);

  }, [UsersList, listUsers]);

  const returnMenu = () => {

    history.push('/menu');

  };

  const onCancel = () => {

    setIsModalOpen(false);

  };

  const onFinish = (values) => {

    const {
      name, lastName, temperature, headAche, fever, cough, pain,
    } = values;

    const newUser = [...UsersList, {
      name,
      lastName,
      temperature,
      symptoms: `${headAche ? 'Dolor de Cabeza,' : ''}${fever ? 'Fiebre,' : ''}${cough ? 'Toz,' : ''}${pain ? 'DDolor Muscular' : ''}`,
    }];

    dispatch(userActions.setListUsers(newUser));
    setListUsers(newUser);
    form.resetFields();
    setIsModalOpen(false);
    message.success('Usuario Creado');

  };

  const onFinishFailed = (errorInfo) => {

    console.log('Failed:', errorInfo);

  };

  const columns = [
    {
      width: '20%',
      title: 'NOMBRES',
      dataIndex: 'name',
      key: 'name',
    },
    {
      width: '20%',
      title: 'APELLIDOS',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      width: '20%',
      title: 'TEMPERATURA',
      dataIndex: 'temperature',
      key: 'temperature',
    },
    {
      width: '20%',
      title: 'SINTOMAS',
      dataIndex: 'symptoms',
      key: 'symptoms',
    },
  ];

  return {
    listUsers,
    returnMenu,
    columns,
    showModal,
    isModalOpen,
    onFinish,
    onFinishFailed,
    onCancel,
  };

};

export default useUsers;
