import styles from './ThemeToggle.module.scss';
import type {FC} from "react";

type ThemeToggleProps = {
    onChange: (isDark: boolean) => void;
    isDark: boolean;
};

export const ThemeToggle: FC<ThemeToggleProps> = ({ onChange, isDark }) => {
    const handleToggle = () => {
        onChange(!isDark);
    };

    return (
        <button
            onClick={handleToggle}
            className={styles.themeToggle}
            aria-label="Toggle theme"
        >
            {isDark ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2" color="white"/>
                    <path d="M12 21v2" color="white"/>
                    <path d="M4.22 4.22l1.42 1.42" color="white"/>
                    <path d="M18.36 18.36l1.42 1.42" color="white"/>
                    <path d="M1 12h2" color="white"/>
                    <path d="M21 12h2" color="white"/>
                    <path d="M4.22 19.78l1.42-1.42" color="white"/>
                    <path d="M18.36 5.64l1.42-1.42" color="white"/>
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
};
