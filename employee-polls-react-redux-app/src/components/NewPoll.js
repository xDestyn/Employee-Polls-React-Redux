// @ts-nocheck
import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import Authenticate from './Authenticate';

const NewPoll = ({ dispatch, authedUser }) => {
  console.log(`NewPoll - user: ${authedUser}`);
  const navigate = useNavigate();

  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Handle Submit - optionOne ${optionOne}`);
    console.log(`Handle Submit - optionTwo ${optionTwo}`);

    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    };

    try {
      dispatch(handleAddQuestion(question));
      console.log(`Dispatch - handleAddQuestion - Success`);
      setSuccess(true);
      setError(false);
    } catch (e) {
      console.log(`Dispatch - handleAddQuestion - Error`);
      setSuccess(false);
      setError(true);
    }

    // dispatch(handleAddQuestion(question))
    //   .then((x) => {
    //     console.log(`X: ${x}`);
    //     if (!x) {
    //       console.log(`Before Success - ${success}`);
    //       console.log(`Before Error - ${error}`);
    //       console.log(`Setting success to false`);
    //       console.log(`Setting error to true`);
    //       setSuccess(false);
    //       setError(true);
    //       console.log(`After Success - ${success}`);
    //       console.log(`After Error - ${error}`);
    //     } else {
    //       console.log(`Setting success to true`);
    //       console.log(`Setting error to false`);
    //       console.log(`Before Success - ${success}`);
    //       console.log(`Before Error - ${error}`);
    //       setSuccess(true);
    //       setError(false);
    //       console.log(`After Success - ${success}`);
    //       console.log(`After Error - ${error}`);
    //     }
    //   })
    //   .catch(() => {
    //     console.log(`Dispatch - handleAddQuestion - Error`);
    //   });

    setOptionOne('');
    setOptionTwo('');
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
          ></input>
        </label>
        <button data-testid="submit-button" type="submit" onClick={handleSubmit}>
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
