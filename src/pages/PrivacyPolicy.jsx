import { FaShieldAlt } from 'react-icons/fa';

// components
import useTitle from './shared/hooks/UseTitle';


const PrivacyPolicy = () => {

    useTitle( 'Privacy Policy' );

    return (
        <div className="bg-base-200 dark:bg-gray-800 py-16 px-4 pt-24">
            <div className="container mx-auto max-w-3xl bg-base-100 dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <FaShieldAlt className="text-5xl text-primary mx-auto mb-4" />
                    <h1 className="text-4xl font-bold">Privacy Policy</h1>
                    <p className="text-sm text-gray-500 mt-2">Last updated: June 27, 2025</p>
                </div>
                <div className="space-y-6 text-gray-700 dark:text-gray-300">
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                        <p>Welcome to VolunteerHub. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
                        <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.</p>
                        <p className="mt-2">The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect may include: Name, Email Address, Phone Number, Password, and Contact Preferences.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
                        <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">4. Will Your Information Be Shared?</h2>
                        <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">5. Contact Us</h2>
                        <p>If you have questions or comments about this policy, you may email us at privacy@volunteerhub.com.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
