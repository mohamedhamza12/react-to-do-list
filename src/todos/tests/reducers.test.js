import { expect } from 'chai';
import { todos} from '../reducers';

describe('The todos reducer', () =>{
    it('Adds a new todo when CREATE_TODO action is received', () =>{
        //Create a fake action and fake current state then defined the expected output
        const fakeTodo = { text: 'Test', isCompleted: false};
        const fakeAction = {
            type: 'CREATE_TODO',
            payload: {
                todo: fakeTodo
            }
        };

        const fakeOriginalState = { isLoading: false, data: [] };

        const expected = {
            isLoading: false,
            data: [fakeTodo]
        };

        const actual = todos(fakeOriginalState, fakeAction);

        expect(actual).to.deep.equal(expected);
    });
});