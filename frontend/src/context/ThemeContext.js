import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState(() => {
        const savedMode = localStorage.getItem('mode');
        return savedMode ? savedMode : 'dark';
    });

    useEffect(() => {
        localStorage.setItem('mode', themeMode);
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
