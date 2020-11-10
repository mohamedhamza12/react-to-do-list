import {expect} from 'chai';
import { getCompletedTodos } from '../selectors';

describe('The getCompletedTodos selector', () => {
    it('Returns only completed todos', () => {
        const fakeTodos = [{
            text: '1',
            isCompleted: true
        },
        {
            text: '2',
            isCompleted: false
        },
        {
            text: '3',
            isCompleted: false
        }];

        const expected = [{text: '1', isCompleted: true}];

        const actual = getCompletedTodos.resultFunc(fakeTodos);

        expect(actual).to.deep.equal(expected);
    });
});