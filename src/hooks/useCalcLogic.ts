import { useState } from 'react';

type Operator = '+' | '-' | '×' | '÷' | null;
type DisplayValue = string | 'Error' | '∞';

export const useCalcLogic = () => {
    const [display, setDisplay] = useState<DisplayValue>('0');
    const [prevValue, setPrevValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<Operator>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const clearAll = () => {
        setDisplay('0');
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const inputDigit = (digit: string) => {
        if (display === 'Error' || display === '∞') return;

        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const inputDot = () => {
        if (display === 'Error' || display === '∞') return;

        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (typeof display === 'string' && !display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const toggleSign = () => {
        if (display === 'Error' || display === '∞' || display === '0') return;

        if (display.startsWith('-')) {
            setDisplay(display.slice(1));
        } else {
            setDisplay('-' + display);
        }
    };

    const performMod = () => {
        if (display === 'Error' || display === '∞') return;

        const currentValue = parseFloat(display as string);

        if (prevValue === null) {
            setPrevValue(currentValue);
            setWaitingForOperand(true);
        } else {
            try {
                const result = prevValue % currentValue;
                setDisplay(String(result));
                setPrevValue(result);
            } catch {
                setDisplay('Error');
            }
            setWaitingForOperand(true);
        }
    };

    const performOperation = (nextOperator: Operator) => {
        const currentValue = parseFloat(display as string);

        if (prevValue === null) {
            setPrevValue(currentValue);
        } else if (operator) {
            const result = calculate(prevValue, operator, currentValue);

            if (result === Infinity || isNaN(result)) {
                setDisplay('∞');
                setPrevValue(null);
                setOperator(null);
                setWaitingForOperand(true);
                return;
            }

            setDisplay(String(result));
            setPrevValue(result);
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (a: number, op: Operator, b: number): number => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '×': return a * b;
            case '÷': return b === 0 ? Infinity : a / b;
            default: return b;
        }
    };

    const handleEquals = () => {
        if (operator === null || prevValue === null) return;

        const currentValue = parseFloat(display as string);
        const result = calculate(prevValue, operator, currentValue);

        if (result === Infinity || isNaN(result)) {
            setDisplay('∞');
        } else {
            setDisplay(String(result));
        }

        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(true);
    };

    return {
        display,
        clearAll,
        inputDigit,
        inputDot,
        toggleSign,
        performMod,
        performOperation,
        handleEquals,
        operator,
    };
};
