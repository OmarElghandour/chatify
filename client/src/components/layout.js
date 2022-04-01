import React, {useState, useEffect, useLayoutEffect, useCallback, useRef} from "react";
import { Outlet } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Nav from "./nav";
import ChatDetails from "./chatDetails";



const Layout = () => {
    const [chatId, setChatId] = useState(null);
    const URL = 'ws://127.0.0.1:8080';
    const [user, setUser] = useState('John');
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(new WebSocket(URL));
    const clientRef = useRef(null);

    function addMessage(message) {
        setMessages([...messages, message]);
    }

    useEffect(() => {
        // Only set up the websocket once
        if (!clientRef.current) {
            const client = new WebSocket(URL);
            clientRef.current = client;

            window.client = client;
            client.onopen = () => {
                client.send('ping');
            };

            client.onmessage = message => {
                console.log('received message', message);
                addMessage(`received '${message.data}'`);
            };

            return () => {
                console.log('Cleanup');
                // Dereference, so it will set up next time
                clientRef.current = null;
                client.close();
            }
        }

    }, []);


    console.log(clientRef)
    return (
        <>
            <div className="main-layout">
                <Nav />
                <div className="router">
                    <Outlet context={
                        [chatId, setChatId]

                    } />
                </div>

                <div className={(isMobile ? 'chat-overlay' : 'chat') + ' ' + 'col'} >
                    <ChatDetails
                        chatId={chatId}
                        ws={ws}
                        messages={messages}
                    />
                </div>

            </div>
        </>
    )
}











export default Layout;