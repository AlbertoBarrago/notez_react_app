import { createContext, useContext, useEffect, useState } from "react";

/**
 * @typedef {Object} AppContextType
 * @property {string} theme
 * @property {function(string): void} setTheme
 */

/** @type {AppContextType} */
const initialState = {
    theme: "system",
    setTheme: () => null,
};

const AppContext = createContext(initialState);

export function useStateContext() {
    return useContext(AppContext);
}

export const ContextProvider = ({
                                    children,
                                    defaultTheme = "system",
                                    storageKey = "vite-ui-theme",
                                    ...props
                                }) => {
    const [theme, setTheme] = useState(
        () => localStorage.getItem(storageKey) || defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const contextValue = {
        theme,
        setTheme: (newTheme) => {
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
    };

    return (
        <AppContext.Provider value={contextValue} {...props}>
            {children}
        </AppContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ContextProvider");
    }

    return context;
};