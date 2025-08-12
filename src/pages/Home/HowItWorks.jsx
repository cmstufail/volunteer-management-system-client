import { FaSearch, FaUserPlus, FaHandsHelping } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { useTheme } from '../../context/ThemeProvider';

const steps = [

    { icon: <FaSearch className="w-10 h-10 mb-4 text-primary" />, title: 'Find a Cause', description: 'Explore various opportunities that match your interests and skills.' },
    { icon: <FaUserPlus className="w-10 h-10 mb-4 text-primary" />, title: 'Register & Apply', description: 'Create your profile and apply for the volunteer posts with a single click.' },
    { icon: <FaHandsHelping className="w-10 h-10 mb-4 text-primary" />, title: 'Make an Impact', description: 'Join the team, contribute your time, and make a real difference in the community.' },
];

const HowItWorks = () => {

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="bg-base-200 dark:bg-gray-800 my-16 px-2 md:px-3 xl:px-2">
            <div className="mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    { steps.map( ( step, index ) => (
                        <motion.div
                            key={ index }
                            className="p-8 bg-base-100 rounded-lg shadow-lg"
                            initial={ { opacity: 0, y: 50 } }
                            whileInView={ { opacity: 1, y: 0 } }
                            transition={ { duration: 0.5, delay: index * 0.2 } }
                            viewport={ { once: true } }
                        >
                            { step.icon }
                            <h3 className="text-xl font-bold mb-2">{ step.title }</h3>
                            <p className={ `${ isDark ? 'text-white' : 'text-gray-800' }` }>{ step.description }</p>
                        </motion.div>
                    ) ) }
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;