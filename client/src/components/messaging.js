import React from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";



const Messaging = () => {
    const navigate = useNavigate();
    const [chatId, setChatId] = useOutletContext();
  
    const handleClick = (chatId) => {
        setChatId(chatId);
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
                <div onClick={() => handleClick(14)} className="messaging__chat row">
                    <img className="messaging__chat-img" alt="" src="/about.jpg"/>
                    <div className="messaging__chat-details" >
                    <h5 className="messaging__chat-username">jesca jones</h5>
                    <p className="messaging__chat-latest">Lorem Ipsum is simply dummy</p>
                    </div>
                </div>

                <div onClick={() => handleClick(10)} className="messaging__chat row">
                    <img className="messaging__chat-img" alt="" src="/about.jpg"/>
                    <div className="messaging__chat-details" >
                    <h5 className="messaging__chat-username">jesca jones</h5>
                    <p className="messaging__chat-latest">Lorem Ipsum is simply dummy</p>
                    </div>
                </div>



                <div className="messaging__chat row">
                    <img className="messaging__chat-img" alt="" src="/about.jpg"/>
                    <div className="messaging__chat-details" >
                    <h5 className="messaging__chat-username">jesca jones</h5>
                    <p className="messaging__chat-latest">Lorem Ipsum is simply dummy</p>
                    </div>
                </div>

                <div className="messaging__chat row">
                    <img className="messaging__chat-img" alt="" src="/about.jpg"/>
                    <div className="messaging__chat-details" >
                    <h5 className="messaging__chat-username">jesca jones</h5>
                    <p className="messaging__chat-latest">Lorem Ipsum is simply dummy</p>
                    </div>
                </div>


                <div className="messaging__chat row">
                    <img className="messaging__chat-img" alt="" src="/about.jpg"/>
                    <div className="messaging__chat-details" >
                    <h5 className="messaging__chat-username">jesca jones</h5>
                    <p className="messaging__chat-latest">Lorem Ipsum is simply dummy</p>
                    </div>
                </div>

                <div className="messaging__chat row">
                    <img className="messaging__chat-img" alt="" src="/about.jpg"/>
                    <div className="messaging__chat-details" >
                    <h5 className="messaging__chat-username">jesca jones</h5>
                    <p className="messaging__chat-latest">Lorem Ipsum is simply dummy</p>
                    </div>
                </div>


                <div className="messaging__chat row">
                    <img className="messaging__chat-img" alt="" src="/about.jpg"/>
                    <div className="messaging__chat-details" >
                    <h5 className="messaging__chat-username">jesca jones</h5>
                    <p className="messaging__chat-latest">Lorem Ipsum is simply dummy</p>
                    </div>
                </div>


                <div className="messaging__chat row">
                    <img className="messaging__chat-img" alt="" src="/about.jpg"/>
                    <div className="messaging__chat-details" >
                    <h5 className="messaging__chat-username">jesca jones</h5>
                    <p className="messaging__chat-latest">Lorem Ipsum is simply dummy</p>
                    </div>
                </div>


                <div className="messaging__chat row">
                    <img className="messaging__chat-img" alt="" src="/about.jpg"/>
                    <div className="messaging__chat-details" >
                    <h5 className="messaging__chat-username">jesca jones</h5>
                    <p className="messaging__chat-latest">Lorem Ipsum is simply dummy</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Messaging;