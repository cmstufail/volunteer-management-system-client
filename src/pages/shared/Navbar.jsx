import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider";
import { useAuth } from "../../context/AuthProvider";

import { FaMoon, FaSun, FaBars, FaChevronDown } from "react-icons/fa";

import logoWhite from '../../assets/images/logo_white.png';
import logoBlack from '../../assets/images/logo_black.png';
import Container from "./Container";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState( false );
    const [ isProfileDropdownOpen, setIsProfileDropdownOpen ] = useState( false );
    const profileDropdownRef = useRef( null );

    const handleLogout = async () => {
        try {
            await logout();
            setIsMobileMenuOpen( false );
        } catch ( err ) {
            console.error( "Logout failed", err );
        }
    };

    useEffect( () => {
        const handleClickOutside = ( event ) => {
            if ( profileDropdownRef.current && !profileDropdownRef.current.contains( event.target ) ) {
                setIsProfileDropdownOpen( false );
            }
        };
        document.addEventListener( "mousedown", handleClickOutside );
        return () => document.removeEventListener( "mousedown", handleClickOutside );
    }, [] );

    const closeAllMenus = () => {
        setIsMobileMenuOpen( false );
        setIsProfileDropdownOpen( false );
    };

    const getNavLinkClass = ( { isActive } ) => {
        const baseClasses = "block md:inline-block px-3 py-2 rounded transition-colors duration-300";
        const activeClasses = "text-primary font-bold underline";
        const inactiveClasses = "hover:bg-base-200 dark:hover:bg-gray-700";

        return `${ baseClasses } ${ isActive ? activeClasses : inactiveClasses }`;
    };

    const navLinks = (
        <>
            <NavLink to="/" onClick={ closeAllMenus } className={ getNavLinkClass }>Home</NavLink>
            <NavLink to="/all-posts" onClick={ closeAllMenus } className={ getNavLinkClass }>All Volunteer Posts</NavLink>
            <NavLink to="/about" onClick={ closeAllMenus } className={ getNavLinkClass }>About us</NavLink>
            <NavLink to="/contact" onClick={ closeAllMenus } className={ getNavLinkClass }>Contact us</NavLink>
            { user && (
                <div className="relative hidden md:block" ref={ profileDropdownRef }>
                    <button onClick={ () => setIsProfileDropdownOpen( !isProfileDropdownOpen ) } className="flex items-center gap-1 px-3 py-2 rounded hover:bg-base-200 dark:hover:bg-gray-700">
                        My Profile <FaChevronDown className="text-xs" />
                    </button>
                    { isProfileDropdownOpen && (
                        <div className="absolute top-full mt-2 w-52 bg-base-100 dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 z-20">
                            <NavLink to="/add-post" className="block px-4 py-2 hover:bg-base-200 dark:hover:bg-gray-700" onClick={ closeAllMenus }>Add Volunteer Post</NavLink>
                            <NavLink to="/manage-posts" className="block px-4 py-2 hover:bg-base-200 dark:hover:bg-gray-700" onClick={ closeAllMenus }>Manage My Posts</NavLink>
                        </div>
                    ) }
                </div>
            ) }
        </>
    );

    return (
        <nav
            className={ `transition-colors duration-300 fixed w-full z-50 shadow-sm py-1 top-0 left-0 right-0 ${ theme === "dark"
                ? "bg-gray-900 text-gray-300"
                : "bg-base-100 text-gray-900"
                }` }
        >

            <Container>
                <div className="flex justify-between items-center">
                    {/* Logo */ }
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src={ theme === 'dark' ? logoBlack : logoWhite } className="w-10 h-10"
                                alt="Logo"
                            />

                            <span className="text-xl font-bold text-primary">
                                VolunteerHub
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */ }
                    <div className="hidden md:flex items-center gap-2">
                        { navLinks }
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={ toggleTheme } className="btn btn-ghost btn-circle">
                            { theme === "dark" ? (
                                <FaSun className="text-yellow-400 text-xl" />
                            ) : (
                                <FaMoon className="text-xl" />
                            ) }
                        </button>

                        { !user ? (
                            <div className="hidden md:flex gap-2">
                                <Link to="/login" className="btn btn-primary btn-sm">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-secondary btn-sm">
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="dropdown dropdown-end dropdown-hover hidden md:flex">
                                <label tabIndex={ 0 } className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={ user.photoURL || 'https://i.pravatar.cc/150' }
                                            alt="profile"
                                        />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={ 0 }
                                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3 z-[1] border dark:border-gray-700 mt-12 ml-10"
                                >
                                    <li
                                        className="px-4 py-2 font-bold border-b dark:border-gray-600 mb-1">
                                        { user.displayName }
                                    </li>
                                    <li>
                                        <button
                                            onClick={ handleLogout } className="w-full text-left p-2 hover:bg-base-200 rounded text-red-500"
                                        >
                                            Logout
                                        </button></li>
                                </ul>
                            </div>
                        ) }

                        {/* Hamburger Menu Button */ }
                        <div className="md:hidden">
                            <button
                                onClick={ () => setIsMobileMenuOpen( !isMobileMenuOpen ) } className="btn btn-ghost btn-circle"
                            >
                                <FaBars className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Mobile Nav */ }
            { isMobileMenuOpen && (
                <div className="md:hidden bg-base-100 dark:bg-gray-800 absolute top-full left-0 w-full shadow-lg p-4">
                    <div className="flex flex-col gap-2">
                        <NavLink
                            to="/"
                            onClick={ closeAllMenus }
                            className={ getNavLinkClass }
                        >Home
                        </NavLink>
                        <NavLink
                            to="/all-posts"
                            onClick={ closeAllMenus }
                            className={ getNavLinkClass }
                        >
                            All Volunteer Posts
                        </NavLink
                        >

                        <div className="divider my-2"></div>
                        { user && (
                            <>
                                <div className="flex items-center gap-3 p-2 rounded-lg bg-base-200 mb-2">
                                    <div className="avatar"><div className="w-10 rounded-full">
                                        <img
                                            src={ user.photoURL || 'https://i.pravatar.cc/150' }
                                            alt={ user.displayName }
                                        />
                                    </div>
                                    </div>
                                    <span className="font-bold">{ user.displayName }</span>
                                </div>
                                <details className="collapse collapse-arrow bg-base-200">
                                    <summary className="collapse-title font-medium">
                                        My Profile
                                    </summary>
                                    <div className="collapse-content">
                                        <ul className="menu menu-compact">
                                            <li>
                                                <NavLink to="/add-post" onClick={ closeAllMenus }>Add Volunteer Post</NavLink></li>
                                            <li><NavLink to="/manage-posts" onClick={ closeAllMenus }
                                            >Manage My Posts</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </details>
                                <NavLink
                                    to="/my-volunteer-list"
                                    onClick={ closeAllMenus }
                                    className={ getNavLinkClass }
                                >
                                    My Applied Posts
                                </NavLink>
                                <div className="divider my-2"></div>
                            </>
                        ) }
                        <div className="flex flex-col gap-2 mt-2">
                            { user ? (
                                <button
                                    onClick={ handleLogout } className="btn btn-error w-full">
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={ closeAllMenus } className="btn btn-primary w-full">
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={ closeAllMenus } className="btn btn-secondary w-full">
                                        Register
                                    </Link>
                                </>
                            ) }
                        </div>
                    </div>
                </div>
            ) }
        </nav>
    );
};

export default Navbar;
