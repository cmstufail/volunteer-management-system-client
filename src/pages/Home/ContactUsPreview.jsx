import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaEnvelopeOpenText } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from './../shared/Container';
import { useTheme } from '../../context/ThemeProvider';



export default function ContactUsPreview() {
     const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
    <Container>
        <section className="bg-base-200 dark:bg-gray-800 py-12">
            <div>
                {/* Title + Icon */ }
                <div className="text-center mb-10">
                    <div className="flex justify-center items-center gap-3 mb-3">
                        <FaEnvelopeOpenText className="text-4xl text-primary" />
                        <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
                    </div>                    
                    <p className={ `${ isDark ? 'text-white' : 'text-gray-800' } text-lg max-w-2xl mx-auto` }>
                        We’d love to hear from you! Here’s how you can reach us.
                    </p>
                </div>

                {/* Contact Info Cards */ }
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="bg-base-100 dark:bg-gray-900 p-6 rounded-lg shadow">
                        <FaMapMarkerAlt className="text-3xl text-primary mx-auto mb-2" />
                        <h3 className="font-semibold text-lg">Our Address</h3>
                        <p className={ `${ isDark ? 'text-white' : 'text-gray-800' } text-sm` }>
                            123 Volunteer Street, Community City, 12345
                        </p>
                    </div>
                    <div className="bg-base-100 dark:bg-gray-900 p-6 rounded-lg shadow">
                        <FaEnvelope className="text-3xl text-primary mx-auto mb-2" />
                        <h3 className="font-semibold text-lg">Email Us</h3>
                        <p className={ `${ isDark ? 'text-white' : 'text-gray-800' } text-sm` }>
                            contact@volunteerhub.com
                        </p>
                    </div>
                    <div className="bg-base-100 dark:bg-gray-900 p-6 rounded-lg shadow">
                        <FaPhone className="text-3xl text-primary mx-auto mb-2" />
                        <h3 className="font-semibold text-lg">Call Us</h3>
                        <p className={ `${ isDark ? 'text-white' : 'text-gray-800' } text-sm` }>+1 234 567 890</p>
                    </div>
                </div>

                {/* Button */ }
                <div className="text-center mt-8">
                    <Link to="/contact" className="btn btn-primary">
                        Send a Message
                    </Link>
                </div>
            </div>
        </section>
    </Container>
    );
}
