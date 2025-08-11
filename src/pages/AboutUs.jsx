import React from 'react';
import { FaUsers, FaLightbulb } from 'react-icons/fa';

import useTitle from './shared/hooks/UseTitle';


const AboutUs = () => {

    useTitle( 'About Us' );

    return (
        <div className="bg-base-200 dark:bg-gray-800 py-16 px-4 pt-24">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold">About VolunteerHub</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">Connecting communities, one volunteer at a time. Discover our mission, vision, and the team that makes it all happen.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                    <div>
                        <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg" alt="Our Team" className="rounded-lg shadow-lg" />
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <FaLightbulb className="text-4xl text-yellow-400" />
                            <div>
                                <h3 className="text-2xl font-semibold">Our Mission</h3>
                                <p className="text-gray-600 dark:text-gray-300">To create a seamless and accessible platform that empowers individuals and organizations to connect, collaborate, and create a positive impact through volunteering.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <FaUsers className="text-4xl text-blue-400" />
                            <div>
                                <h3 className="text-2xl font-semibold">Our Vision</h3>
                                <p className="text-gray-600 dark:text-gray-300">We envision a world where everyone has the opportunity to contribute to their community, fostering a global culture of empathy, service, and collective well-being.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
