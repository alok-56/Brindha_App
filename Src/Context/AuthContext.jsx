import { createContext, useState } from 'react';
export const authcontext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [islogin, setislogin] = useState(false);

    return (
        <authcontext.Provider value={{ islogin, setislogin }}>
            {children}
        </authcontext.Provider>
    );
};


