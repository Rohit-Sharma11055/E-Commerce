import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { styles } from "../assets/dummyStyles";

const Layout = ({ user, setUser, onLogout }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className={styles.layout.root}>
            <Navbar
                user={user}
                setUser={setUser}
                onLogout={onLogout}
            />

            <Sidebar
                user={user}
                isCollapsed={sidebarCollapsed}
                setIsCollapsed={setSidebarCollapsed}
            />

            <main className={styles.layout.mainContainer(sidebarCollapsed)}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;