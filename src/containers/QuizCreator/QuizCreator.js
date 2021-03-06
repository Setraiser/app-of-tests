import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import Select from '../../components/UI/Select';
import {createControl, validate, validateForm} from '../../form';
import Auxiliary from '../../hoc/Auxiliary';
import { connect } from 'react-redux';
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create';

const createOptionControl = (number) => {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, {required: true})
}

const createFormControls = () => {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}
 
class QuizCreator extends Component {

    state = {
        formControls: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    addQuestionHandler = (event) => {
        event.preventDefault();
        const {createQuizQuestion} = this.props;
        const {formControls, rightAnswerId} = this.state;

        const {question, option1, option2, option3, option4} = formControls;

        const quiz = this.props.quiz;
        const questionItem = {
            question: question.value,
            id: quiz.length + 1,
            rightAnswerId: rightAnswerId,
            answers: [
                {
                    text: option1.value,
                    id: option1.id
                },
                {
                    text: option2.value,
                    id: option2.id
                },
                {
                    text: option3.value,
                    id: option3.id
                },
                {
                    text: option4.value,
                    id: option4.id
                }
            ]
        }

        createQuizQuestion(questionItem);

        this.setState({
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        });
    }

    createQuizHandler = (event) => {
        event.preventDefault();
        const {finishCreateQuiz} = this.props;
        
        this.setState({
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        });
        finishCreateQuiz();
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = { ...formControls[controlName]};
        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);
        formControls[controlName] = control;
        
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        });

    } 

    renderInputs() {
        const {formControls} = this.state;
        return Object.keys(formControls).map((controlName, idx) => {
            const control = formControls[controlName];
            const {label, value, valid, validation, touched, errorMessage}  = control;
            return (
                <Auxiliary key={controlName + idx}>
                    <Input 
                        label={label}
                        value={value}
                        valid={valid}
                        shouldValidate={!!validation}
                        touched={touched}
                        errorMessage={errorMessage}
                        onChange={(event) => this.changeHandler(event.target.value, controlName)}
                    />
                    {idx === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const {rightAnswerId, isFormValid} = this.state;
        const {quiz} = this.props;
        const select = <Select
            label="Выберите правильный ответ"
            value={rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderInputs()}

                        { select }

                        <Button 
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button 
                            type="succes"
                            onClick={this.createQuizHandler}
                            disabled={quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {create} = state;
    return {
        quiz: create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(QuizCreator)