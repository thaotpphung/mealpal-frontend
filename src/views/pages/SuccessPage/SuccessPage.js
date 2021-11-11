import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Spinner from '../../common/Spinner/Spinner';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import { setUser } from '../../../redux/actions/userActions';
import { addAlertWithTimeout } from '../../../redux/actions/alertActions';
import { getUser } from '../../../api/index';

const SuccessPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getUser(userId, '?fields=isVerified')
      .then(({ data }) => {
        dispatch(setUser(data.data));
        history.push('/');
      })
      .catch((error) => {
        setError(error.response.data.message);
        dispatch(
          addAlertWithTimeout(
            'error',
            'An error has occurred, please try reloggin'
          )
        );
      })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && error) return <EmptyMessage />;
  return <Spinner />;
};

export default SuccessPage;
