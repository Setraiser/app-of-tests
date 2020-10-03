import React, {Component} from 'react';
import classes from './QuizList.module.css';
import {NavLink} from 'react-router-dom';
import Loader from '../../components/UI/Loader';
import {connect} from 'react-redux';
import {fetchQuizes} from '../../store/actions/quiz';

class QuizList extends Component {

    renderQuizes() {
        const {quizes} = this.props;
        return quizes.map((quiz) => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            );
        })
    }

   componentDidMount() {
       const {fetchQuizes} = this.props;
       fetchQuizes();
    }

    render() {
        const {loading, quizes} = this.props;
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {
                        loading && quizes.length !== 0
                            ? <Loader />
                            : <ul>
                                { this.renderQuizes()}
                              </ul>
                    
                    }
                    
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {quiz} = state;
    return {
        quizes: quiz.quizes,
        loading: quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);