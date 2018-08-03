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
        case "CHANGE_DRIVER":
            //console.log("CHANGE_DRIVER");
            return {...state,
            value: action.payload,
            change: "driver"
        }
        case "CHANGE_ALL_DRIVERS":
            return {...state,
                value: action.payload,
                change: "all_drivers"
            }
        default:
            return state
    }
}

const store = createStore(reduser);


export default store;
