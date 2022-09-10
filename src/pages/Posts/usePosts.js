/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { FcViewDetails } from 'react-icons/fc';
import { Button } from 'antd';
import moment from 'moment/moment';
import apiPosts from '../../api/apiPosts';

const usePosts = () => {

  const [listCountries, setListPosts] = useState([]);
  const [Country, setCountry] = useState([]);
  const [listCountriesDetail, setListPostsDetail] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const postsList = useSelector(({ postReducer }) => postReducer.listPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const abortC = new AbortController();
  const { signal } = abortC;

  useEffect(() => {

    setListPosts(postsList);

  }, []);

  const onCancel = () => {

    setIsModalOpen(false);

  };

  const filterTable = (e) => {

    let filterList;
    if (e.target.value !== '') {

      const filterReference = [...postsList];
      filterList = [...filterReference].filter((values) => {

        if (values.Country.includes(e.target.value)) {

          return values;

        }

      });

      setListPosts(filterList);

    } else {

      setListPosts(postsList);

    }

  };

  const handleOk = () => {

    setIsModalVisible(false);

  };

  const handleCancel = () => {

    setIsModalVisible(false);

  };

  const manageDetails = async (record) => {

    const parameters = {
      Country: record.Country,
      dateStart: moment(record.Date).subtract(1, 'year'),
      dateEnd: record.Date,
    };

    const response = await apiPosts.getByCountry({ signal, parameters });
    setListPostsDetail(response.reverse());
    setCountry(record.Country);
    setIsModalOpen(true);

  };

  const columns = [
    {
      width: '20%',
      title: 'PAIS',
      dataIndex: 'Country',
      key: 'Country',
    },
    {
      width: '20%',
      title: 'NUMERO CONFIRMADOS',
      dataIndex: 'TotalConfirmed',
      key: 'TotalConfirmed',
    },
    {
      width: '20%',
      title: 'NUMERO FALLECIDOS',
      dataIndex: 'TotalDeaths',
      key: 'TotalDeaths',
    },
    {
      width: '20%',
      title: 'NUMERO RECUPERADOS',
      dataIndex: 'TotalRecovered',
      key: 'TotalRecovered',
    },
    {
      title: 'DETALLES',
      width: '9%',
      dataIndex: 'id',
      render: (_, record) => (
      // eslint-disable-next-line react/jsx-filename-extension
        <Button onClick={() => {

          manageDetails(record);

        }}
        >
          <FcViewDetails />
        </Button>

      ),
    },
  ];

  const columnsModal = [
    {
      width: '20%',
      title: 'FECHA',
      dataIndex: 'Date',
      key: 'Date',
    },
    {
      width: '20%',
      title: 'NUMERO CONFIRMADOS',
      dataIndex: 'Confirmed',
      key: 'Confirmed',
    },
    {
      width: '20%',
      title: 'NUMERO FALLECIDOS',
      dataIndex: 'Deaths',
      key: 'Deaths',
    },
    {
      width: '20%',
      title: 'NUMERO RECUPERADOS',
      dataIndex: 'Recovered',
      key: 'Recovered',
    },
  ];

  return {
    listCountries,
    handleOk,
    handleCancel,
    columns,
    isModalVisible,
    filterTable,
    columnsModal,
    listCountriesDetail,
    isModalOpen,
    onCancel,
    Country,
  };

};

export default usePosts;
