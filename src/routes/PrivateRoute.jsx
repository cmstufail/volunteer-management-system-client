import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import LoadingSpinner from '../pages/shared/LoadingSpinner';

const PrivateRoute = ( { children } ) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if ( loading ) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if ( user ) {
        return children;
    }

    return <Navigate to="/login" state={ { from: location } } replace />;
};

export default PrivateRoute;