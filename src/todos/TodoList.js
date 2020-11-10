import React, { useEffect } from 'react';
// import './TodoList.css';
import { connect } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import { loadTodos } from './thunks';
import TodoListItem from './TodoListItem';
import styled from 'styled-components';
import { getCompletedTodos, getIncompleteTodos, getTodosLoading } from './selectors';


const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({ completedTodos, incompleteTodos, isLoading, startLoadingTodos }) => {
        useEffect(() => {
            startLoadingTodos();
        }, []);
        const loadingMessage = <div>Loading Todos...</div>
        const content = (
        <ListWrapper>
            <NewTodoForm />
            <h3>Completed Todos</h3>
            {completedTodos.map(todo => <TodoListItem todo={todo} /> )}
            <h3>Incomplete Todos</h3>
            {incompleteTodos.map(todo => <TodoListItem todo={todo} /> )}
        </ListWrapper>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos())
});
 
export default connect(mapStateToProps  , mapDispatchToProps )(TodoList);