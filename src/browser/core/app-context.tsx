import React, { createContext, useEffect, useReducer } from 'react';


let initialState = {
    mainPage: {
        pageNum: 1,
    },
    sessionExpiry: Math.floor(Date.now() / 1000) + 300, // 5 mins
    showIntro: true,
    loading: false,
    ready: true
};

export const localStorageKey = "BoipelosSWApp";

if (typeof window !== 'undefined') {
    let localState = localStorage.getItem(localStorageKey);
    if (localState) {
        initialState = JSON.parse(localState);
    }
}

if (typeof window !== 'undefined') {
    initialState.ready = true;
    if (!localStorage.getItem(localStorageKey)) {
        localStorage.setItem(localStorageKey, JSON.stringify(initialState));
    }
} else {
    initialState.ready = false;
    initialState.showIntro = false;
}

let defaultValue = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(localStorageKey) ?? JSON.stringify(initialState)) : initialState;
export const AppContext = createContext<any>(defaultValue);

const reducer = (state: typeof initialState, action: any) => {

    let newState = state;

    switch (action.type) {
        case "mainPageNext":
            newState.mainPage.pageNum += 1;
            // if (typeof window !== 'undefined') {
            //     localStorage.setItem(localStorageKey, JSON.stringify(newState));
            // }
            return newState;
        case "mainPagePrev":
            newState.mainPage.pageNum = newState.mainPage.pageNum > 1 ? newState.mainPage.pageNum - 1 : 1;
            // if (typeof window !== 'undefined') {
            //     localStorage.setItem(localStorageKey, JSON.stringify(newState));
            // }
            return newState;
        case "mainPageNavigate":
            newState.mainPage.pageNum = action.value;
            // if (typeof window !== 'undefined') {
            //     localStorage.setItem(localStorageKey, JSON.stringify(newState));
            // }
            return newState;
        case "createNewSession":
            newState.showIntro = true;
            newState.sessionExpiry = Math.floor(Date.now() / 1000) + 300; // 5 mins
            // if (typeof window !== 'undefined') {
            //     localStorage.setItem(localStorageKey, JSON.stringify(newState));
            // }
            return newState;
        case "dontShowIntro":
            newState.showIntro = false;
            // if (typeof window !== 'undefined') {
            //     localStorage.setItem(localStorageKey, JSON.stringify(newState));
            // }
            return newState;
        case "loading":
            newState.loading = !state.loading;
            // if (typeof window !== 'undefined') {
            //     localStorage.setItem(localStorageKey, JSON.stringify(newState));
            // }
            return newState;
        case "setLoading":
            newState.loading = true;
            // if (typeof window !== 'undefined') {
            //     localStorage.setItem(localStorageKey, JSON.stringify(newState));
            // }
            return newState;
        case "unsetLoading":
            newState.loading = false;
            // if (typeof window !== 'undefined') {
            //     localStorage.setItem(localStorageKey, JSON.stringify(newState));
            // }
            return newState;
        case "setState":
            newState = action.state ?? newState;
            // if (typeof window !== 'undefined') {
            //     localStorage.setItem(localStorageKey, JSON.stringify(newState));
            // }
            return newState;
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