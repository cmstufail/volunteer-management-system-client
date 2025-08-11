const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75">
            <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
    );
};

export default LoadingSpinner;