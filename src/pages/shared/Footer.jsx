import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// components
import logoWhite from '../../assets/images/logo_white.png';
import logoBlack from '../../assets/images/logo_black.png';
import Container from './Container';
import { useTheme } from '../../context/ThemeProvider';


const Footer = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';


    const getFooterLinkClass = ( { isActive } ) => {
        return isActive
            ? "text-primary font-bold underline underline-offset-4 transition-colors duration-300"
            : "hover:text-primary transition-colors duration-300";
    };

    return (
        <footer className={ `transition-colors duration-300 ${ theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600 border-t' }` }>
            <Container>
                <div className="py-10 mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-16 lg:gap-36">
                        {/* Logo and text*/ }
                        <div className="md:col-span-1 ml-6 xl:ml-0">
                            <Link to="/" className="flex items-center gap-2 mb-4">
                                <img src={ theme === 'dark' ? logoBlack : logoWhite } alt="VolunteerHub Logo" className="w-10 h-10" />
                                <span className={ `text-2xl font-bold ${ theme === 'dark' ? 'text-white' : 'text-gray-900' }` }>VolunteerHub</span>
                            </Link>
                            <p>Connecting communities, one volunteer at a time.</p>
                        </div>

                        {/* Quick Links */ }
                        <div className='ml-6'>
                            <h3 className={ `text-lg font-semibold mb-4 ${ theme === 'dark' ? 'text-white' : 'text-gray-900' }` }>Quick Links</h3>
                            <ul className="space-y-2">
                                <li><NavLink to="/" className={ getFooterLinkClass }>Home</NavLink></li>
                                <li><NavLink to="/all-posts" className={ getFooterLinkClass }>All Posts</NavLink></li>
                                <li><NavLink to="/my-profile" className={ getFooterLinkClass }>My Profile</NavLink></li>
                            </ul>
                        </div>

                        {/* Legal */ }
                        <div className='ml-6'>
                            <h3 className={ `text-lg font-semibold mb-4 ${ theme === 'dark' ? 'text-white' : 'text-gray-900' }` }>Legal</h3>
                            <ul className="space-y-2">
                                <li><NavLink to="/privacy-policy" className={ getFooterLinkClass }>Privacy Policy</NavLink></li>
                                <li><NavLink to="/about" className={ getFooterLinkClass }>About Us</NavLink></li>
                                <li><NavLink to="/contact" className={ getFooterLinkClass }>Contact Us</NavLink></li>
                            </ul>
                        </div>

                        {/* Follow Us */ }
                        <div className='ml-6'>
                            <h3 className={ `text-lg font-semibold mb-4 ${ theme === 'dark' ? 'text-white' : 'text-gray-900' }` }>Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition-colors">
                                    <FaFacebook size={ 24 } />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors">
                                    <FaTwitter size={ 24 } />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
                                    <FaInstagram size={ 24 } />
                                </a>
                            </div>
                            <div className="mt-4 space-y-2">
                                <p>contact@volunteerhub.com</p>
                                <p>+1 234 567 890</p>
                            </div>
                        </div>
                    </div>
                    <div className={ `mt-8 pt-6 text-center text-gray-500 border-t ${ theme === 'dark' ? 'border-gray-700' : 'border-gray-200' }` }>
                        <p className={ `${ isDark ? 'text-white' : 'text-gray-800' } text-sm` }>&copy; { new Date().getFullYear() } VolunteerHub. All rights reserved.</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
