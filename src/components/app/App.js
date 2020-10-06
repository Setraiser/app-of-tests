import React, {Component} from 'react';
import Layout from '../../hoc/Layout';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Auth from '../../containers/Auth';
import QuizList from '../../containers/QuizList';
import QuizCreator from '../../containers/QuizCreator';
import Quiz from '../../containers/Quiz';
import './App.css';
import { connect } from 'react-redux';
import Logout from '../Logout/Logout';
import { autoLogin } from '../../store/actions/auth';

class App extends Component {

  componentDidMount() {
    this.props.authLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/quiz-creator" component={QuizCreator}/>
        <Route path="/quiz/:id" component={Quiz}/>
        <Route path="/" exact component={QuizList}/>
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/quiz-creator" component={QuizCreator}/>
          <Route path="/quiz/:id" component={Quiz}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={QuizList}/>
          <Redirect to='/' />
        </Switch>
      )
    }
  
    return (
      <Layout>
        { routes }
      </Layout>
    );
  }

  
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
