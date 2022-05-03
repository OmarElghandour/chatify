import React, { createContext, useContext, useState } from "react";

export const UsersContext = createContext();

export const UserProvider = (props) => {
    const [activeChat, setActiveChat] = useState(null);
    const [users, setUsers] = useState([]);

    return (
            <UsersContext.Provider value={{users : [users, setUsers], activeChat: [activeChat, setActiveChat] }}
              >
                {props.children}
            </UsersContext.Provider>
    );
    
}

export const useUserContext = () => useContext(UsersContext);
