import React, { useEffect, useState } from 'react';
import { navbarStyles } from '../assets/dummyStyles';
import img1 from "../assets/logo.png";
import { ChevronDown, LogOut, User, Search, Heart, ShoppingBag  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";

const Navbar = ({user: propUser, setUser, onLogout}) => {
    const navigate = useNavigate();
    const menuRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);

    const user = propUser;

    // to fetch the user data from the server
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try{
    //             const token = localStorage.getItem("token");
    //             if(!token) return;

    //             const response = await axios.get(`${BASE_URL}/me`, {
    //                 headers: {Authorization: `Bearer ${token}`},
    //             });
    //             const userData = response.data.user || response.data;
    //             setUser(userData);
    //         }
    //         catch (err){
    //             console.error("Failed to load profile", err);
    //         }
    //     };

    //     if(!propUser){
    //         fetchUserData();
    //     }
    // }, [propUser]);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const handleLogout = () => {
        setMenuOpen(false);
        localStorage.removeItem("token");
        onLogout?.();
        navigate("/login");
    };


  return (
    <header className={navbarStyles.header}>
        <div className={navbarStyles.container}>
            {/* logo */}
            <div
                onClick={() => navigate("/")}
                className={navbarStyles.logoContainer}
            >
                <div className = {navbarStyles.logoImage}>
                    <img src={img1} alt="logo" />
                </div>
                <span className = {navbarStyles.logoText}>SHOPORA</span>
            </div>

            {/* navlinks */}
            <div className = {navbarStyles.navlinkContainer}>
                <NavLink
                    to="/shop"
                    className={navbarStyles.navLink}
                >
                    SHOP
                </NavLink>

                <NavLink
                    to="/street-drip"
                    className={navbarStyles.activeNavLink}
                >
                    ⚡ STREET DRIP
                </NavLink>

                <NavLink
                    to="/boots"
                    className={navbarStyles.navLink}
                >
                    BOOTS
                </NavLink>

                <NavLink
                    to="/jeans"
                    className={navbarStyles.navLink}
                >
                    JEANS
                    <span className={navbarStyles.newBadge}>NEW</span>
                </NavLink>

                <NavLink
                    to="/linen"
                    className={navbarStyles.navLink}
                >
                    LINEN
                </NavLink>

            </div>


           
           
           
            {/* user features */}
            {/* <div>

            </div> */}

            {/* user profile icon */}
            {/* Right Section */}
            <div className="flex items-center gap-6">

                {/* Common Icons */}
                <button
                    onClick={() => navigate("/search")}
                    className="text-gray-500 hover:text-black transition-colors"
                >
                    <Search size={24} />
                </button>

                <button
                    onClick={() => navigate("/wishlist")}
                    className="text-gray-500 hover:text-black transition-colors"
                >
                    <Heart size={24} />
                </button>

                <button
                    onClick={() => navigate("/cart")}
                    className="relative text-gray-500 hover:text-black transition-colors"
                >
                    <ShoppingBag size={24} />

                    {/* Cart Badge */}
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-lime-300 text-black text-[10px] font-bold flex items-center justify-center">
                        1
                    </span>
                </button>

                {/* Guest */}
                {!user ? (
                    <>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-8 py-3 border border-gray-700 rounded-full font-semibold hover:bg-gray-100 transition"
                        >
                            LOGIN
                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="px-8 py-3 rounded-full bg-lime-300 font-semibold hover:bg-lime-400 transition"
                        >
                            SIGN UP
                        </button>
                    </>
                ) : (
                    /* Logged In */
                    <div className={navbarStyles.userContainer} ref={menuRef}>
                        <button
                            onClick={toggleMenu}
                            className={navbarStyles.userButton}
                        >
                            <div className="relative">
                                <div className={navbarStyles.userAvatar}>
                                    {user?.name?.[0]?.toUpperCase() || "U"}
                                </div>

                                <div className={navbarStyles.statusIndicator}></div>
                            </div>

                            <div className={navbarStyles.userTextContainer}>
                                <p className={navbarStyles.userName}>
                                    {user?.name || "User"}
                                </p>

                                <p className={navbarStyles.userEmail}>
                                    {user?.email || "dummy@store.com"}
                                </p>
                            </div>

                            <ChevronDown
                                className={navbarStyles.chevronIcon(menuOpen)}
                            />
                        </button>

                        {menuOpen && (
                            <div className={navbarStyles.dropdownMenu}>
                                <div className={navbarStyles.dropdownHeader}>
                                    <div className="flex items-center gap-3">
                                        <div className={navbarStyles.dropdownAvatar}>
                                            {user?.name?.[0]?.toUpperCase() || "U"}
                                        </div>

                                        <div>
                                            <div className={navbarStyles.dropdownName}>
                                                {user?.name || "User"}
                                            </div>

                                            <div className={navbarStyles.dropdownEmail}>
                                                {user?.email || "dummy@store.com"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={navbarStyles.menuItemContainer}>
                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            navigate("/profile");
                                        }}
                                        className={navbarStyles.menuItem}
                                    >
                                        <User className="w-4 h-4" />
                                        <span>My Profile</span>
                                    </button>
                                </div>

                                <div className={navbarStyles.menuItemBorder}>
                                    <button
                                        onClick={handleLogout}
                                        className={navbarStyles.logoutButton}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Log Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </header>
  )
}

export default Navbar
