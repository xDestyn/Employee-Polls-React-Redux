// @ts-nocheck
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAnswer } from '../actions/questions';
import { formatPoll, withRouter } from '../utils/helpers';
import Authenticate from './Authenticate';
import avatar from '../static/avatar.png';

const PollsPage = ({ question, dispatch, id }) => {
  console.log(`PollsPage - question: ${question}`);
  console.log(`PollsPage - dispatch: ${dispatch}`);
  console.log(`PollsPage - id: ${id}`);

  const navigate = useNavigate();

  // Verify if there's a question
  if (question === null) {
    return (
      <div className="question-not-found">
        <p>Question not found</p>
        <form action="/" method="get">
          <button>Go Home</button>
        </form>
      </div>
    );
  }

  const {
    name,
    avatarURL,
    optionOneText,
    optionTwoText,
    hasAnswered,
    selectedVote,
    totalVotes,
    optionOnePercentage,
    optionTwoPercentage,
  } = question;

  const handleClick = (option) => {
    dispatch(handleAnswer(id, option));
    navigate(`/questions/${id}`);
  };

  return (
    <div className="polls-option-div">
      <Authenticate />
      <div>
        <img alt="user-avatar" className="user-avatar" src={avatarURL ?? avatar} />
        <h2>{name} asks</h2>
      </div>
      <div>
        <h4>Would You Rather</h4>
        {!hasAnswered ? (
          <div>
            <button onClick={() => handleClick('optionOne')}>{optionOneText}</button>
            <button onClick={() => handleClick('optionTwo')}>{optionTwoText}</button>
          </div>
        ) : (
          <div className="answered-question-poll-div">
            <span>This question has already been answered by you.</span>
            <button disabled>{selectedVote}</button>
            <hr />
            <h3>Vote Status:</h3>
            <div className="percentage-poll-div">
              <div className="percentage-poll-option-one">
                <button name="optionOneButton" className="optionOne">
                  {optionOneText}
                </button>
                <span>{optionOnePercentage}%</span>
              </div>
              <div className="percentage-poll-option-two">
                <button name="optionTwoButton" className="optionTwo">
                  {optionTwoText}
                </button>
                <span>{optionTwoPercentage}%</span>
              </div>
            </div>
            <hr />
            <span>Total Votes:</span>
            <div className="percentage-votes-div">
              <span>{totalVotes}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.router.params;
  const question = questions[id];

  return {
    authedUser,
    id,
    question: question ? formatPoll(question, users[question.author], authedUser) : null,
  };
};

export default withRouter(connect(mapStateToProps)(PollsPage));
