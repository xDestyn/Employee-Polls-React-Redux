import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAuthedUser } from '../actions/authedUser';

const NavBar = ({ user, authedUser, dispatch }) => {
  console.log(`NavBar - user: ${JSON.stringify(user)}`);
  console.log(`NavBar - authedUser: ${authedUser}`);
  console.log(`NavBar - dispatch: ${dispatch}`);

  const name = user?.name ?? '';
  const avatar = user?.avatarURL ?? '';

  const handleClick = () => {
    console.log('Before dispatch(logoutAuthedUser())');
    dispatch(logoutAuthedUser());
    console.log('After dispatch(logoutAuthedUser())');
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/add">New Poll</Link>
        </li>
        {authedUser && (
          <li className="user-data">
            <div className="user-nav">
              <img src={avatar} alt={`${authedUser}`} className="user-avatar" />
              <span>{name}</span>
            </div>
          </li>
        )}
        <li>
          {authedUser ? (
            <div onClick={handleClick} className="logout">
              <span>Logout</span>
            </div>
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users,
    user: users[authedUser],
  };
};

export default connect(mapStateToProps)(NavBar);
