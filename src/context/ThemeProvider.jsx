/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

// components
const ThemeContext = createContext();

export const ThemeProvider = ( { children } ) => {
    const [ theme, setTheme ] = useState( localStorage.getItem( "theme" ) || "light" );

    useEffect( () => {
        document.documentElement.setAttribute( "data-theme", theme );
        localStorage.setItem( "theme", theme );
    }, [ theme ] );


    const toggleTheme = () => setTheme( theme === "light" ? "dark" : "light" );

    return (
        <ThemeContext.Provider value={ { theme, toggleTheme } }>
            { children }
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
export const useTheme = () => useContext( ThemeContext );
