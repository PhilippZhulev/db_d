import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

const init = {
    page: 'home'
};

function reduser (state = init, action) {
    if(action.type === "CHANGE_PAGE") {
        return {...state, page: action.payload}
    }
    if(action.type === "CHANGE_TEMPLATE") {
        return {...state,
            value: action.payload
        }
    }
    return state;
}

const store = createStore(reduser);


export default store;
