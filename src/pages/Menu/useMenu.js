import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
// import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import userActions from '../../state/users/actions';
import postActions from '../../state/post/actions';
import tagsActions from '../../state/tags/actions';
import apiPosts from '../../api/apiPosts';

const useMenu = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [imageUser, setImageUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const [newTag, setNewTag] = useState('');
  const userInfo = useSelector(({ userReducer }) => userReducer.logged);
  const tag = useSelector(({ tagsReducer }) => tagsReducer.listTags);
  const abortC = new AbortController();
  const { signal } = abortC;

  useEffect(() => {

    setImageUser(userInfo.imageUrl);
    setNameUser(userInfo.name);
    dispatch(tagsActions.setListTags('users/ Registro Usuarios'));

  }, []);

  useEffect(() => {

    setNewTag(tag);

  }, [tag]);

  const usersView = async () => {

    dispatch(tagsActions.setListTags('users/ Registro Usuarios'));
    history.push('/users');

  };

  const postsView = async () => {

    const posts = await apiPosts.getPosts({ signal });
    dispatch(postActions.setListPosts(posts.Countries));
    dispatch(tagsActions.setListTags('posts/ Resgistros Paises'));
    history.push('/posts');

  };

  const exitApp = () => {

    const userLogged = {
      state: false,
      name: '',
      imageUrl: '',
      email: '',
    };
    dispatch(userActions.setLogged(userLogged));
    history.push('/');

  };

  const selectMenu = ({ key }) => {

    if (key === '1') {

      usersView();

    } else if (key === '2') {

      postsView();

    }

  };

  return {
    imageUser,
    nameUser,
    selectMenu,
    usersView,
    postsView,
    exitApp,
    collapsed,
    setCollapsed,
    newTag,
  };

};

export default useMenu;
