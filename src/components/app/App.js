import React from 'react';
import Layout from '../../hoc/Layout';
import {Route, Switch} from 'react-router-dom';
import Auth from '../../containers/Auth';
import QuizList from '../../containers/QuizList';
import QuizCreator from '../../containers/QuizCreator';
import Quiz from '../../containers/Quiz';
import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/quiz-creator" component={QuizCreator}/>
        <Route path="/quiz/:id" component={Quiz}/>
        <Route path="/" component={QuizList}/>
      </Switch>
    </Layout>
  );
}

export default App;
