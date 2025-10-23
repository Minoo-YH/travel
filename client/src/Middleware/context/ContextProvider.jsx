import React, { createContext, useContext, useReducer } from 'react';

const MyContext = createContext();

export const useValue = () => {
    return useContext(MyContext);
};

const initialState = {
    user: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    );
};

export default ContextProvider; 


