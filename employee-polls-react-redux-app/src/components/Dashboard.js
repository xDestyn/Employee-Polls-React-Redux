// @ts-nocheck
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Authenticate from './Authenticate';
import { connect } from 'react-redux';
import { PollPreview } from './PollPreview';

const Dashboard = ({ answered, unanswered, users }) => {
  console.log(`Dashboard - answered: ${JSON.stringify(answered)}`);
  console.log(`Dashboard - unanswered: ${JSON.stringify(unanswered)}`);
  console.log(`Dashboard - users: ${JSON.stringify(users)}`);

  return (
    <div className="dashboard-home">
      <Authenticate />
      <Tabs>
        <TabList>
          <Tab>Unanswered</Tab>
          <Tab>Answered</Tab>
        </TabList>
        <TabPanel className="answered-questions">
          <div>
            <h3>Unanswered Questions</h3>
            {unanswered.length
              ? unanswered.map((question) => {
                  return (
                    <PollPreview
                      key={question.id}
                      id={question.id}
                      question={question}
                      user={users[question.author]}
                    />
                  );
                })
              : ''}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="unanswered-questions">
            <h3>Answered Questions</h3>
            {answered.length
              ? answered.map((question) => {
                  return (
                    <PollPreview
                      key={question.id}
                      id={question.id}
                      question={question}
                      user={users[question.author]}
                    />
                  );
                })
              : ''}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
  const polls = Object.keys(questions).map((question) => questions[question]);
  const answered = polls
    .filter(
      (question) =>
        question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser),
    )
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = polls
    .filter((question) => !answered.includes(question))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    questions,
    answered,
    unanswered,
    users,
  };
};

export default connect(mapStateToProps)(Dashboard);
