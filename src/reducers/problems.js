import { handleActions } from 'redux-actions';
import { createProblem } from '../actions/problems';

const problems = handleActions({
    [createProblem.success]: (state, { payload }) => payload,
}, {});

export default problems;
