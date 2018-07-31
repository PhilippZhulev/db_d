import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

function reduser (state = null, action) {
    switch (action.type) {
        case "CHANGE_PAGE":
            return {...state,
                page: action.payload
            };
        case "CHANGE_TEMPLATE":
            return {...state,
                value: action.payload,
                change: "template"
            };
        case "CHANGE_SLIDERS_POS":
            return {...state,
                value: action.payload,
                change: "slidersPos"
            };
        case "CHANGE_MENU":
            return {...state,
                value: action.payload,
                change: "menu"
            };
        default:
            return state
    }
}

const store = createStore(reduser);


export default store;
