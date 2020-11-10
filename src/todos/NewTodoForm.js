import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { createTodo } from './actions';
import { addTodoRequest } from './thunks';
import './NewTodoForm.css'
import styled from 'styled-components';
import { getTodos } from './selectors';

const NewTodoFormDiv = styled.div
`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewTodoButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;

const NewTodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState('');
    return(
        <NewTodoFormDiv>
            <NewTodoInput type="text" 
            placeholder="Type new todo"
            value={inputValue} onChange={e => setInputValue(e.target.value)} />
            <NewTodoButton 
                onClick={() => { 
                    const isDuplicate =
                        todos.some(todo => todo.text === inputValue);
                    if (!isDuplicate) {
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}
                >Create Todo</NewTodoButton>
        </NewTodoFormDiv>
)};

//takes as an argument the entire redux state and returns only the pieces of the state 
//that the component needs access to. The component now automatically receives those pieces as props
const mapStateToProps = state => ({
    todos: getTodos(state)
});

//its behavior is similar to the above. The difference here is that dispatch is a function that
//allows the component to trigger actions that the Redux store will respond to
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);