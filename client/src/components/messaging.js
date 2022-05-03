import axios from "axios";
import React, { useContext } from "react";
import { UsersContext } from "../context/userProvider";


const Messaging = () => {
    const context = useContext(UsersContext);
    const [users] = context.users;
    const [activeChat, setActiveChat] = context.activeChat;

    const handleClick = (userId) => {
        setActiveChat(userId);
    }

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
                <div key={user._id} onClick={() => handleClick(user._id)} className="messaging__chat row">
                    <img className="messaging__chat-img" alt="" src="/about.jpg"/>
                    <div className="messaging__chat-details" >
                    <h5 className="messaging__chat-username">{user.userName}</h5>
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