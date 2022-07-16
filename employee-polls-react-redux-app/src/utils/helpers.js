/* eslint-disable no-empty-pattern */

import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + date.toLocaleDateString();
};

export const formatPoll = (question, author, authedUser) => {
  let hasAnswered = false;
  let isAuthor = false;
  let selectedVote = '';

  // Destructure poll
  const {
    id,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
    timestamp,
  } = question;

  // Verify if a vote has been submitted
  // Extract that vote
  if (
    question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser)
  ) {
    hasAnswered = true;
    if (question.optionOne.votes.includes(authedUser)) {
      selectedVote = question.optionOne.text;
    } else if (question.optionTwo.votes.includes(authedUser)) {
      selectedVote = question.optionTwo.text;
    }
  }

  // Verify if poll is self made
  if (author === authedUser) {
    isAuthor = true;
  }

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  const optionOnePercentage = Math.round((optionOneVotes / totalVotes) * 100);
  const optionTwoPercentage = Math.round((optionTwoVotes / totalVotes) * 100);

  // Return Poll Model
  return {
    id,
    timestamp,
    name: author.name,
    avatarURL: author.avatarURL,
    optionOneText,
    optionTwoText,
    hasAnswered,
    selectedVote,
    isAuthor,
    totalVotes,
    optionOnePercentage,
    optionTwoPercentage,
  };
};

export const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};
