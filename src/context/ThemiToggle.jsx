import { FaMoon, FaSun } from "react-icons/fa";

// components
import { useTheme } from "../components/ThemeProvider";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button onClick={ toggleTheme } className="text-xl p-2">
            { theme === "light" ? <FaMoon /> : <FaSun /> }
        </button>
    );
};

export default ThemeToggle;
