import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Nav from "./nav";
import ChatDetails from "./chatDetails";
import { UsersContext } from "../context/userProvider";
const BASE_URL = process.env.REACT_APP_API;


const Layout = () => {
    const URL = 'ws://127.0.0.1:8080';
    const [ws] = useState(new WebSocket(URL));

    const context = useContext(UsersContext);
    const [users, setUsers] = context.users;
    const [messages, setMessages] = useState([]);
    const clientRef = useRef(null);

    function addMessage(message) {
        console.log(message);   
        setMessages([...messages, {body : message}]);
    }

    useEffect(() => {
        let isMounted = true;
        axios.get(`${BASE_URL}/users/`).then(response => {
            if (isMounted) {
                setUsers(response.data);
            }
        }).catch(err => {
            console.error(err);
        });
        return () => { isMounted = false };
    }, []);

    useEffect(() => {
        // Only set up the websocket once
        if (!clientRef.current) {
            const client = new WebSocket(URL);
            clientRef.current = client;

            window.client = client;
            const userData = JSON.parse(localStorage.getItem('userData'));
            const { id } = userData;
            client.onopen = () => {
                client.send(JSON.stringify({ userId: id }));
            };

            client.onmessage = message => {
                addMessage(`received '${message.data}'`);
            };

            return () => {
                // Dereference, so it will set up next time
                clientRef.current = null;
                client.close();
            }
        }

    }, [messages]);
    
    return (
        <>
                <div className="main-layout">
                    <Nav />
                    <div className="router">
                        <Outlet />
                    </div>

                    <div className={(isMobile ? 'chat-overlay' : 'chat') + ' ' + 'col'} >
                        <ChatDetails
                            ws={ws}
                            messages={messages}
                            addMessage={addMessage}
                        />
                    </div>

                </div>
        </>
    )
}

export default Layout;