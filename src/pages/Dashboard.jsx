// components
import { useAuth } from '../context/AuthProvider';
import useTitle from './shared/hooks/UseTitle';


const Dashboard = () => {

  useTitle( 'Dashboard' );

  const { user } = useAuth();

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Dashboard
        </h1>

        <div className="text-center space-y-4">
          <img
            src={ user?.photoURL || '/default-avatar.png' }
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
          />
          <h2 className="text-xl font-semibold">{ user?.displayName || 'User Name' }</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{ user?.email }</p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="btn btn-primary">My Posts</button>
            <button className="btn btn-secondary">Add New Post</button>
            <button className="btn btn-accent">My Volunteer List</button>
            <button className="btn btn-error">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
