import React from "react";
import useCollapse from 'react-collapsed';



const Account = () => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    return (
        <section className="account section" id="account">
            <h1 className="section__title">Account</h1>
            <div className="account__user-info">
                <div className="account__profile-img">
                    <img src="/about.jpg" alt="" />
                </div>

                <h1 className="account__user-name">jesca jones</h1>

                <div className="account__user-status row">
                    <i className='bx bx-radio-circle-marked icon active' ></i>
                    <h3>active</h3>
                </div>
            </div>


            <div className="section__details ">
                    <p className="section__info">
                    Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's
                    </p>

                <div>
                    <button id="1" className="account__about collabse-button" {...getToggleProps()}>
                        <i className='bx bx-user' ></i>
                        <h3>about</h3>
                        <i className='bx bx-down-arrow-alt button-arrow' ></i>
                    </button>

                    <section className="collapsed-content" {...getCollapseProps()}>
                        making it look like readable English. Many desktop publishing packages and web page editors 
                        </section>
                </div>

                <div>
                    <button id="2" className="account__about collabse-button" {...getToggleProps()}>
                        <i className='bx bx-user' ></i>
                        <h3>attached files</h3>
                        <i className='bx bx-down-arrow-alt button-arrow' ></i>
                    </button>

                    <section className="collapsed-content" {...getCollapseProps()}>
                    Lorem Ipsum is simply dummy text of the 
                    printing and typesetting industry. Lorem Ipsum has been</section>
                </div>

            </div>

        </section>
    )
}

export default Account;