import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

const LoginPage = ({ userIds, users, dispatch }) => {
  console.log(`LoginPage - userIds: ${JSON.stringify(userIds)}`);
  console.log(`LoginPage - Users: ${JSON.stringify(users)}`);

  const [selectedOption, setSelectedOption] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    e.preventDefault();
    console.log('LoginPage - User Selection:', e.target.value);
    setSelectedOption(e.target.value);

    // Valid user - Set authenticated user
    // Otherwise, get redirected to login
    if (e.target.value !== '' && e.target.value !== 'none') {
      dispatch(setAuthedUser(e.target.value));
      // @ts-ignore
      navigate(location?.state?.location);
    } else if (e.target.value === 'none') {
      dispatch(setAuthedUser(''));
      navigate('/login');
    }
  };

  return (
    <div className="login-vote-container">
      <h2>Select user to login</h2>
      <select
        name="users"
        defaultValue={selectedOption}
        className="user-options"
        onChange={handleChange}
      >
        <option value={'none'} key={'none'}>
          None
        </option>
        {userIds.map((id) => {
          return (
            <option value={id} key={id}>
              {users[id].name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const mapStateToProps = (state) => {
  const users = state.users;
  return {
    userIds: Object.keys(users),
    users,
  };
};

export default connect(mapStateToProps)(LoginPage);
