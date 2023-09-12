import React from "react";
import NavigationBar from "../home/navigation/NavigationBar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
function RootLayOut() {
    return (
        <div className="main-content">
            <NavigationBar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default RootLayOut;
