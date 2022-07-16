// @ts-nocheck
import React from 'react';
import { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import { Route, Routes } from 'react-router-dom';
import { handleInitialData } from './actions/shared';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import PollsPage from './components/PollsPage';
import NewPoll from './components/NewPoll';
import Leaderboard from './components/Leaderboard';
import { PageNotFound } from './components/PageNotFound';
import './App.css';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);

  return (
    <Fragment>
      <LoadingBar />
      <NavBar />
      <div className="container">
        {props.loading === true ? null : (
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/questions/:id" element={<PollsPage />} />
            <Route exact path="/leaderboard" element={<Leaderboard />} />
            <Route exact path="/add" element={<NewPoll />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ questions }) => ({
  loading: questions === null,
});

export default connect(mapStateToProps)(App);
