import {handleActions} from 'redux-actions';

const STATE1 = 'STATE1';
const STATE2 = 'STATE2';
const iniState = {
    dummyValue: 1
};

const AppStore  = {
    actionState1: (label) => {
        label = label | "xx ";
        return {
            type: STATE1,
            dummyValue: label
        }
    },
    reducer: handleActions({
    STATE1: (state, action) => ({
        dummyValue: action.dummyValue
    }),
    STATE2: (state, action) => ({
        dummyValue: 3
    })}, iniState )


};

export default  AppStore;