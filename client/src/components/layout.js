import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./nav";



const Layout = () => {
    return (
        <>
        <div className="main-layout">
            <Nav />
            <Outlet />
        </div>
        </>
    )
}

export default Layout;