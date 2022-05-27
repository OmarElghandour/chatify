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
    const messageData = {};
    const context = useContext(UsersContext);
    const [users, setUsers] = context.users;
    const [chats, setChats] = context.chats;
    const [messages, setMessages] = useState([]);
    const [severMessages, setSeverMessages] = useState([]);
    const clientRef = useRef(null);
    function addMessage(message) {
        console.log(messages);    
        setMessages([...messages, message]);
    }


    useEffect(() => {
        let isMounted = true;
        axios.get(`${BASE_URL}/users/`).then(response => {
            console.log(response);
            if (isMounted) {
                const usersList = response.data;
                const loggedInUsers = JSON.parse(localStorage.getItem('userData')).id;
                const connectedUsers = usersList?.filter(user => user._id !== loggedInUsers);
        
                setUsers(connectedUsers);
            }
        }).catch(err => {
            console.error(err);
        });
        return () => { isMounted = false };
    }, []);


    useEffect(() => {
        console.log(chats);
    }, [chats]);



    useEffect(() => {
        let isMounted = true;
        // Only set up the websocket once
        if (!clientRef.current) {
            console.log('oopen')

            const client = new WebSocket(URL);
            clientRef.current = client;

            window.client = client;
            const userData = JSON.parse(localStorage.getItem('userData'));
            const { id } = userData;
            client.onopen = () => {
                client.send(JSON.stringify({ eventName: "connected", payload: id }));
            };

            client.onmessage = message => {

                console.log(message);



                const parsedMessage = JSON.parse(message.data);
                if (parsedMessage.eventName === 'userConnected') {
                    if (parsedMessage.payload.length) {
                        parsedMessage.payload.forEach(id => {
                            setChats(prevState => ({
                                ...prevState,
                                [id]: []
                            }));

                        });
                    }
                }
                if (parsedMessage.eventName === 'newMessage') {
                    console.log(parsedMessage);
                    const { senderId, body } = parsedMessage.payload;
                    setChats(prevState => ({
                        ...prevState,
                        [senderId]: [...prevState[senderId], { sender: senderId, body }]
                    }));
                }

            };

            client.onclose = function () {
                // websocket is closed.
                console.log("Connection is closed...");
               };
            
            return () => { isMounted = false };
        }
    }, []);

    return (
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
    )
}

export default Layout;