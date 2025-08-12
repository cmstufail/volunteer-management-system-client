import { Link } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

// components
import { useTheme } from '../../context/ThemeProvider';


const AboutUsPreview = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section className="bg-base-200 dark:bg-gray-800 my-24 py-12 rounded-2xl shadow-md ">
            <div className="max-w-5xl mx-auto text-center">
                {/* Title with Icon */ }
                <div className="flex justify-center items-center gap-3 mb-6">
                    <FaInfoCircle className="text-3xl text-primary" />
                    <h2 className="text-3xl md:text-4xl font-bold">About Us</h2>
                </div>

                <p className={ `${ isDark ? 'text-white' : 'text-gray-800' } text-lg max-w-4xl mx-auto mb-8` }>
                    We are dedicated to connecting volunteers with impactful causes.
                    Our mission is to make a difference in communities by empowering
                    individuals to take action.
                </p>
                <Link to="/about" className="btn btn-primary">
                    Learn More
                </Link>
            </div>
        </section>
    );
};

export default AboutUsPreview;
