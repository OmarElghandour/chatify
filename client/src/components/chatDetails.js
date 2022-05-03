import React, { useContext, useEffect, useRef, useState } from "react";
import { UsersContext } from "../context/userProvider";


const ChatDetails = (props) => {
    const {ws, messages } = props;
    const [message,setMessage] = useState(null);
    const [curruntUser, setCurruntUser] = useState(null)
    const context = useContext(UsersContext);
    const [users] = context.users;
    const [activeChat, setActiveChat] = context.activeChat;
    const inputEl = useRef(null);


    useEffect(() => {
        console.log(messages);
    },[messages]);

    useEffect(() => {
        getOpenChatUser();
    },[]);

   const getOpenChatUser = () => {
        const currentUser = users.find(user => user._id === activeChat);
        setCurruntUser(currentUser);
    } 
    
    const sendMessage = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const { id } = userData;
        ws.send(JSON.stringify({data: message, activeChat, userId : id }));
        inputEl.current.value = '';
        props.addMessage(message);
    }

    const handelChanges = (value) => {
        setMessage(value);
    }


    return (
        
        <div className="chat__details">
            <div className="chat__details-header row">
                <div className="chat__profile row">
                    <i className='bx bx-left-arrow-alt bx-md' ></i>
                    <img className="roundedImg avatart" src="/about.jpg" alt="" />
                    <h4 className="chat__profile-name">{curruntUser?.userName}</h4>
                </div>
                <i className='bx bx-dots-horizontal-rounded bx-md'></i>
            </div>


            <div className="chat-messages">
                {messages.map((message, index) => (  
                <div key={index} >
                    <div className="chat__details-user-chat row">
                        <p>{message.body}</p>
                    </div><div className="chat__details-person-chat row">
                            <p>hello repley </p>
                    </div>
                </div>    
                ))
                }
            </div>


            <div className="message-area row">
                <input
                name="message"
                onChange={(e) => handelChanges(e.target.value)}
                className="form-control chat-input"
                ref={inputEl}
                >
                </input>
                <i className='bx bx-send bx-md chat__details-send' onClick={() => sendMessage()} ></i>
            </div>
        </div>
    )
}


export default ChatDetails;