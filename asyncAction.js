const redux = require('redux');
const reduxThunk = require('redux-thunk');
const axios = require('axios');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = reduxThunk.default;

/**
 *  State of our application
 */
const initialState = {
    loading: false,
    users: [],
    error: ''
}

/**
 *  Action type declared as constants
 */
const FETCH_USERS_REQUEST = `FETCH_USERS_REQUEST`;
const FETCH_USERS_SUCCESS = `FETCH_USERS_SUCCESS`;
const FETCH_USERS_FAILURE = `FETCH_USERS_FAILURE`;

/**
 *  Action creator returns action object for type: FETCH_USERS_REQUEST
 */
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

/**
 *  Action creator returns action object for type: FETCH_USERS_SUCCESS
 */
const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

/**
 *  Action creator return action object for type: FETCH_USERS_FAILURE
 */
const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

/**
 *  Reducer for handling actions
 */
const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: payload,
                error: ''
            };
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: payload
            };
        default: 
            return state;
    }
}

/**
 *  Action creater returns a fucntion object (ability of a thunk middleware)
 */
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user['id']); 
                dispatch(fetchUsersSuccess(users));
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message));
            })
    };
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => { console.log(store.getState()) });
store.dispatch(fetchUsers());