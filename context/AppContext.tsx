import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your context
type AppContextType = {
    globalMessage: string;
    setGlobalMessage: React.Dispatch<React.SetStateAction<string>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [globalMessage, setGlobalMessage] = useState<string>('Welcome to the app!');

    return (
        <AppContext.Provider value={{ globalMessage, setGlobalMessage }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};