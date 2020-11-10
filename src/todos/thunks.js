import {loadTodosInProgress, loadTodosSuccess, loadTodosFailure, createTodo, removeTodo, markTodoAsCompleted } from './actions';

//A thunk is a function that returns another function which is why we have "() => () =>" below
export const displayAlert = text => () => {
    alert(`Error: ${text}`);
};

export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos-delay');
        const todos = await response.json();

        dispatch(loadTodosSuccess(todos));
    } catch(e) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
    

};

export const addTodoRequest = text => async (dispatch) => {
    const body = JSON.stringify({ text });
    try { 
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body
        });

        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

export const deleteTodo = id => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete'
        });
        //Response is awaited instead of directly using the input id to make sure that the request
        //succeeded before removing the todo from the UI
        
        const todo = await response.json();
        dispatch(removeTodo(todo.id));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};

export const updateTodoToCompleted = id => async (dispatch) => {
    try {
        const response = await fetch (`http://localhost:8080/todos/${id}/completed`, {
            method: 'post'
        });
        const todo = await response.json();
        dispatch(markTodoAsCompleted(todo.id));
    } catch (e) {
        dispatch(displayAlert(e));
    }
};