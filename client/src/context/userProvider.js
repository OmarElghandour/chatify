import React, { createContext, useContext, useState } from "react";

export const UsersContext = createContext();

export const UserProvider = (props) => {
    const [chats, setChats] = useState({});
    const [users, setUsers] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    return (
            <UsersContext.Provider value={
              {
               users : [users, setUsers],
               chats: [chats, setChats],
               activeChat : [activeChat, setActiveChat]
              }}
              >
                {props.children}
            </UsersContext.Provider>
    );
    
}

export const useUserContext = () => useContext(UsersContext);
