import React, {Component} from 'react';
import classes from './QuizList.module.css';
import axios from '../../axios';
import {NavLink} from 'react-router-dom';
import Loader from '../../components/UI/Loader';

export default class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    }

    renderQuizes() {
        const {quizes} = this.state;
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

   async componentDidMount() {
       try {
           const response = await axios.get('/quizes.json');
           const quizes = [];
           Object.keys(response.data).forEach((key, idx) => {
               quizes.push({
                    id: key,
                    name: `Тест №${idx + 1}`
               });  
           });

           this.setState({
               quizes,
               loading: false
           });
       } catch(e) {
           console.log(e);
       }
        
    }

    render() {
        const {loading} = this.state;
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестос</h1>
                    {
                        loading
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