const redux = require('redux');
const reduxLogger = require('redux-logger');

const { createStore, combineReducers} = redux;
const applyMiddleware = redux.applyMiddleware; 
const logger = reduxLogger.createLogger();
const BUY_CAKE = `BUY_CAKE`;
const BUY_ICECREAMS = `BUY_ICECREAMS`;

buy_cakes = () => {
    return {
        type: BUY_CAKE,
        info: "first redux application"
    }
}

buy_icecreams = () => {
    return {
        type: BUY_ICECREAMS,
        info: "first redux application"
    }
}

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIcecreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    const { type } = action;
    switch( type ) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            };
        default: 
            return state;
    }
}

const icecreamReducer = (state = initialIceCreamState, action) => {
    const { type } = action;
    switch( type ) {
        case BUY_ICECREAMS:
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams - 1
            };
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
});

const store = createStore(rootReducer,applyMiddleware(logger));
console.log("Initial state", store.getState());
const  unsubscribe = store.subscribe(() => {});
store.dispatch(buy_cakes());
store.dispatch(buy_cakes());
store.dispatch(buy_cakes());
store.dispatch(buy_icecreams());
store.dispatch(buy_icecreams());
unsubscribe();
