import { createStore } from 'redux';


function reduser (state = null, action) {
    switch (action.type) {
        case "CHANGE_START":
            return {...state,
                data: action.payload,
                change: "first_include"
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
            return {...state,
            value: action.payload,
            change: "driver"
        };
        case "CHANGE_DRIVER_RESULT":
            return {...state,
                value: action.payload,
                change: "driver_result"
            };
        case "CHANGE_ALL_DRIVERS":
            return {...state,
                value: action.payload,
                change: "all_drivers"
            };
        case "CHANGE_DRIVER_ROUTER":
            return {...state,
                states: action.payload,
                change: "drivers_router"
            };
        default:
            return state
    }
}



const store = createStore(reduser);

let getState,
    change;

store.subscribe(() => {
    getState = store.getState();
    change = getState.change;
});

export {store as default, getState, change};
