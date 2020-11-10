import { CREATE_TODO, REMOVE_TODO, MARK_TODO_AS_COMPLETED,
LOAD_TODOS_IN_PROGRESS, LOAD_TODOS_SUCCESS, LOAD_TODOS_FAILURE } from './actions';

/* export const isLoading = (state = false, action) => {
    const {type} = action;

    switch(type) {
        case LOAD_TODOS_IN_PROGRESS :
            return true;
        case LOAD_TODOS_SUCCESS:
        case LOAD_TODOS_FAILURE:
            return false;
        default:
            return state;
    }
} */

const defaultState = {isLoading: false, data: []};

export const todos = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_TODO: {
            const { todo } = payload;
            return {
                ...state,
                data: state.data.concat(todo)
            };
        }
        case REMOVE_TODO: {
            const { id } = payload;
            return { 
                ...state,
                data: state.data.filter(todo => todo.id !== id)};
        }
        case MARK_TODO_AS_COMPLETED: {
            const { id } = payload;
            return {
                ...state,
                data: state.data.map(todo => {
                if (todo.id === id) {
                    return { ...todo, isCompleted: true}
                }
                return todo;
            })
        };
        }
        case LOAD_TODOS_SUCCESS: {
            const { todos } = payload;
            return {
                ...state,
                isLoading: false,
                data: todos
            };
        }
        case LOAD_TODOS_IN_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case LOAD_TODOS_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}