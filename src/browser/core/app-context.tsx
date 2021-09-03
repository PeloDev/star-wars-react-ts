import React, { createContext, useReducer } from 'react';


let initialState = {};

export const AppContext = createContext(initialState);

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                loading: state ? !state.loading : true
            };
        case "setLoading":
            return {
                ...state,
                loading: true
            };
        case "unsetLoading":
            return {
                ...state,
                loading: false
            };
        case "setState":
            return action.state;
        default:
            throw new Error();
    }
};

export const StateProvider = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    );
}