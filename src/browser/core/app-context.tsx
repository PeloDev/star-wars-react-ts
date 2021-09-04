import React, { createContext, useEffect, useReducer } from 'react';


let initialState = {
    /** Used to manage the state of the main page */
    mainPage: {
        searchTerm: "",
        pageNum: 1,
    },
    loading: false
};

const localStorageKey = "BoipelosSWApp";

if (typeof window !== 'undefined') {
    if (!localStorage.getItem(localStorageKey)) {
        localStorage.setItem(localStorageKey, JSON.stringify(initialState));
    }
} else {
    console.log("WINDOW UNDEFINED");
}


export const AppContext = createContext<any>(initialState);

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "mainPageNext":
            let mainPageNextState = state;
            mainPageNextState.mainPage.pageNum += 1;
            return mainPageNextState;
        case "mainPagePrev":
            let mainPagePrevState = state;
            mainPagePrevState.mainPage.pageNum = mainPagePrevState.mainPage.pageNum > 1 ? mainPagePrevState.mainPage.pageNum - 1 : 1;
            return mainPagePrevState;
        case "mainPageSearch":
            let mainPageSearchState = state;
            mainPageSearchState.mainPage.searchTerm = action.value;
            return mainPageSearchState;
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
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        }
    }, [state]);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    );
}