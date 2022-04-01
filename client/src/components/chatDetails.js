import React, { useEffect, useState } from "react";


const ChatDetails = (props) => {
    const {ws, messages } = props;
    const [message,setMessage] = useState(null);
    const sendMessage = () => {
        ws.send(JSON.stringify(message));
    }

    const handelChanges = (value) => {
        setMessage(value);
    }

    useEffect(() => {

    },[messages]);

    return (
        <div className="chat__details">
            <div className="chat__details-header row">
                <div className="chat__profile row">
                    <i className='bx bx-left-arrow-alt bx-md' ></i>
                    <img className="roundedImg avatart" src="/about.jpg" alt="" />
                    <h4 className="chat__profile-name">jesca jones</h4>
                </div>
                <i className='bx bx-dots-horizontal-rounded bx-md'></i>
            </div>


            <div className="chat-messages">
                <div className="chat__details-user-chat row">
                <p>hello i'm chat</p>
                </div>

                <div className="chat__details-person-chat row">
                <p>hello repley </p> 
                </div>
            </div>

            <div className="message-area row">
                <textarea
                name="message"
                onChange={(e) => handelChanges(e.target.value)}
                className="form-control chat-input">
                </textarea>
                <i className='bx bx-send bx-md chat__details-send' onClick={() => sendMessage()} ></i>
            </div>
        </div>
    )
}


export default ChatDetails;