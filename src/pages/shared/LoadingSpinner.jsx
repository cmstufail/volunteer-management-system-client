
const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full min-h-[100px]">
            <svg
                className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-label="Loading"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
            </svg>
            <span className="text-blue-600 font-medium select-none">
                Loading, Please wait...
            </span>
        </div>
    );
};

export default LoadingSpinner;
