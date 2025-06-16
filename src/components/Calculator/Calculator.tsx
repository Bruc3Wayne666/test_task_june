import {FC, useEffect, useState} from 'react';
import { useCalcLogic } from '../../hooks/useCalcLogic';
import { Display } from './Display';
import { CalculatorButtons } from './CalculatorButtons';
import styles from './Calculator.module.scss';
import {ThemeToggle} from "../ThemeToggle/ThemeToggle";

export const Calculator: FC = () => {
    const {
        display,
        clearAll,
        inputDigit,
        inputDot,
        toggleSign,
        performMod,
        performOperation,
        handleEquals,
        operator,

    } = useCalcLogic();

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (/^[0-9]$/.test(e.key)) {
                inputDigit(e.key);
            } else if (e.key === '.') {
                inputDot();
            } else if (e.key === 'Enter') {
                handleEquals();
            } else if (e.key === 'Escape') {
                clearAll();
            } else if (e.key === '+') {
                performOperation('+');
            } else if (e.key === '-') {
                performOperation('-');
            } else if (e.key === '*') {
                performOperation('×');
            } else if (e.key === '/') {
                performOperation('÷');
            } else if (e.key === '_') {
                toggleSign();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputDigit, inputDot, handleEquals, clearAll, performOperation, toggleSign]);

    return (
        <div className={`${styles.calculator} ${isDarkTheme ? styles.dark : styles.light}`}>
            <div className={styles.header}>
                <ThemeToggle onChange={setIsDarkTheme} isDark={isDarkTheme} />
            </div>
            <Display value={display} />
            <CalculatorButtons
                onDigitClick={inputDigit}
                onClear={clearAll}
                onToggleSign={toggleSign}
                onDotClick={inputDot}
                onOperatorClick={performOperation}
                onEqualsClick={handleEquals}
                activeOperator={operator}
                onModClick={performMod}
            />
        </div>
    );
};
