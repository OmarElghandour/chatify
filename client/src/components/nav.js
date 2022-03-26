import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";


const Nav = () => {
    return (
        <>
        <nav className="nav" id="nav">

            <div className="nav__menu">

                <Link className="nav__item" to="/account">
                    <i className='bx bx-user'></i>

                </Link>

                <Link className="nav__item" to={'/messaging'} >
                    
                    <i className='bx bx-message-square-dots'></i>
                </Link>



                <Link className="nav__item" to="/groups">
                    <i className='bx bxs-user-account' ></i>

                </Link>



                <Link className="nav__item" to="/contacts">
                    <i className='bx bxs-user-detail'></i>

                </Link>

                <Link className="nav__item" to={'/settings'} >
                    <i className='bx bx-cog'></i>
                </Link>

                <Link className="nav__item" to="/">
                    <div className="nav__profile">
                        <img alt="" src="about.jpg" />
                    </div>

                </Link>

            </div>

        </nav>
        </>
    )
}


export default Nav