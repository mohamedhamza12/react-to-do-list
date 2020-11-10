import React from 'react';
import {connect} from 'react-redux';
import { deleteTodo, updateTodoToCompleted } from './thunks';
import styled from 'styled-components';

const TodoItemContainer = styled.div
`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

//extends TodoItemContainer
const TodoItemContainerWithWarning = styled(TodoItemContainer)`
    border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 2)) ?
    'none': '2px solid red'};
`;

const ButtonsContainer = styled.div
`
    position: absolute;
    right: 12px;
    bottom: 12px;
`;

const Button = styled.div
`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
`;

const CompletedButton = styled(Button)
`
    display: inline-block;
    background-color: #22ee22;
`;

const RemoveButton = styled(Button)
`
    display: inline-block;
    background-color: #ee2222;
    margin-left: 8px;
`;


const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {
    const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;
    return(
    <Container createdAt={todo.createdAt}>
        <h3>{todo.text}</h3>
        <p>Created at:&nbsp;
            {new Date(todo.createdAt).toLocaleDateString()}
        </p>
        <ButtonsContainer>
            {todo.isCompleted ? null 
            : <CompletedButton 
            onClick={() => onCompletedPressed(todo.id)}>Mark As Completed</CompletedButton>}
            <RemoveButton onClick={() => onRemovePressed(todo.id)}>Remove</RemoveButton>
        </ButtonsContainer>
    </Container>
    );
}


const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(deleteTodo(id)),
    onCompletedPressed: id => dispatch(updateTodoToCompleted(id))
})

export default connect(null, mapDispatchToProps)(TodoListItem);