import axios from "axios";
import React, { useContext, useEffect } from "react";
import { UsersContext } from "../context/userProvider";


const Messaging = () => {
    const context = useContext(UsersContext);
    const [users, setUsers] = context.users;
    const [activeChat, setActiveChat] = context.activeChat;

    const handleClick = (userId) => {
        console.log(users);
        console.log(userId);
        setActiveChat(userId);
    }

    // useEffect(() => {
    // const loggedInUsers = JSON.parse(localStorage.getItem('userData')).id;
    // const connectedUsers = users?.filter(user => user._id !== loggedInUsers);
    // console.log(connectedUsers);
    //  setUsers(connectedUsers);
    // },[])

    return (
        <section className="section messaging">
            <h1 className="section__title">Chats</h1>

            <div className="search-input-group">
                <i className='bx bx-search search-icon'></i>
                <input placeholder="search for name" className="search-input" />
            </div>

            <div onClick={() => handleClick(12)} className="messaging__top-users">
                <div className="messaging__user-block">
                    <div className="messaging__profile-img">
                        <img src="/about.jpg" alt="" />
                    </div>
                    joh doe
                </div>

                <div className="messaging__user-block">
                    <div className="messaging__profile-img">
                        <img src="/about.jpg" alt="" />
                    </div>
                    joh doe
                </div>


                <div className="messaging__user-block">
                    <div className="messaging__profile-img">
                        <img src="/about.jpg" alt="" />
                    </div>
                    joh doe
                </div>

                <div className="messaging__user-block">
                    <div className="messaging__profile-img">
                        <img src="/about.jpg" alt="" />
                    </div>
                    joh doe
                </div>

            </div>

            <div className="messaging__chats col">

                {users.map((user) => (
                    <div key={user._id}
                     onClick={() => handleClick(user._id)}
                     className={'messaging__chat row' + ' ' + (user._id === activeChat ? 'active' : '')}                     
                     >
                        <img className="messaging__chat-img" alt="" src="/about.jpg" />
                        <div className="messaging__chat-details" >
                            <h5 className="messaging__chat-username">{user.userName}</h5>
                                <p>{user._id}</p>
                            <p className="messaging__chat-latest">Lorem Ipsum is simply dummy</p>
                        </div>
                    </div>
                ))
                }


            </div>
        </section>
    )
}

export default Messaging;