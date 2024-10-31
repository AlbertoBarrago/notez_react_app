import {createContext, useContext, useState} from "react";

/**
 * @enum {string}
 * @readonly
 */
const Role = {
    GUEST: 'GUEST',
    ADMIN: 'ADMIN'
};

/**
 * @typedef {Object} UserLogged
 * @property {null} lastLogin - The last login timestamp.
 * @property {Role[]} role - The roles assigned to the user.
 * @property {string} email - The user's email address.
 * @property {string} username - The user's username.
 */

/**
 * @type {{ userLogged: UserLogged }}
 */
const initialState = {
    userLogged: {
        username: "",
        email: "",
        lastLogin: null,
        role: null
    }
}

const AppContext = createContext(initialState);

export function useStateContext() {
    return useContext(AppContext);
}

export const ContextProvider = ({ children }) => {
    const [userLogged, setUserLogged] = useState(initialState);

    const globalState = {
        userLogged,
        setUserLogged
    }

    return <AppContext.Provider value={globalState}>{children}</AppContext.Provider>;
}

