// @ts-nocheck
import React from 'react';
import { connect } from 'react-redux';
import Authenticate from './Authenticate';

const Leaderboard = ({ users }) => {
  const rankUsers = users.sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div>
      <Authenticate />
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Answers</th>
            <th>Questions</th>
          </tr>
        </thead>
        <tbody>
          {rankUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <img alt="avatar" className="avatar" src={`${user.avatarURL}`} />
                  <span>{user.name}</span>
                </td>
                <td>
                  <span>{Object.keys(user.answers).length}</span>
                </td>
                <td>
                  <span>{user.questions.length}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  const rankUserList = Object.values(users);
  rankUserList.map(
    (user) => (user.totalScore = Object.keys(user.answers).length + user.questions.length),
  );
  return {
    users: rankUserList,
  };
};

export default connect(mapStateToProps)(Leaderboard);
