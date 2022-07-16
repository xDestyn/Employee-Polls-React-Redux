// @ts-nocheck
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const Authenticate = (props) => {
  console.log(`Authenticate - props: ${JSON.stringify(props)}`);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authStatus = props.authStatus;
    if (authStatus) {
      navigate('/login', { state: { location: location.pathname } });
    }
  }, [props.authStatus, location?.pathname, navigate]);
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authStatus: authedUser === null ? true : false,
  };
};

export default connect(mapStateToProps)(Authenticate);
