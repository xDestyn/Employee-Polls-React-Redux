// @ts-nocheck
import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { useNavigate } from 'react-router-dom';
import Authenticate from './Authenticate';

const NewPoll = ({ dispatch, authedUser }) => {
  console.log(`NewPoll - user: ${authedUser}`);
  let navigate = useNavigate();

  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Handle Submit - optionOne ${optionOne}`);
    console.log(`Handle Submit - optionTwo ${optionTwo}`);

    if (optionOne !== '' && optionTwo !== '') {
      const question = {
        optionOneText: optionOne,
        optionTwoText: optionTwo,
      };
      dispatch(handleAddQuestion(question));
      console.log(`Dispatch - handleAddQuestion - Success`);
      setSuccess(true);
      setError(false);
    } else {
      console.log(`Dispatch - handleAddQuestion - Error`);
      setSuccess(false);
      setError(true);
    }

    setOptionOne('');
    setOptionTwo('');

    setTimeout(function () {}, 5000);

    navigate('/');
  };

  const handleChangeOptionOne = (e) => {
    console.log(`Option one submit: ${e.target.value}`);
    setOptionOne(e.target.value);
  };

  const handleChangeOptionTwo = (e) => {
    console.log(`Option two submit: ${e.target.value}`);
    setOptionTwo(e.target.value);
  };

  return (
    <div className="new-poll-div">
      <Authenticate />
      {success && (
        <h1 data-testid="success-header" className={'Success'}>
          Poll Submitted!
        </h1>
      )}
      {error && (
        <h1 data-testid="error-header" className={'Error'}>
          Please enter required properties
        </h1>
      )}
      <h1>Create your own poll!</h1>
      <h2>Would You Rather</h2>
      <form name="poll-form" className="new-poll">
        <label className="selection-one-label" htmlFor="optionOneValue">
          Option One
          <input
            data-testid="option-one-input"
            placeholder="Option One"
            onChange={handleChangeOptionOne}
            value={optionOne}
            name="optionOneValue"
            disabled={success}
          ></input>
        </label>
        <label className="selection-two-label" htmlFor="optionTwoValue">
          Option Two
          <input
            data-testid="option-two-input"
            placeholder="Option Two"
            onChange={handleChangeOptionTwo}
            value={optionTwo}
            name="optionTwoValue"
            disabled={success}
          ></input>
        </label>
        <button disabled={success} data-testid="submit-button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return { authedUser };
};

export default connect(mapStateToProps)(NewPoll);
