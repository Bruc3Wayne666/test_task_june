import { FC } from 'react';
import styles from './Calculator.module.scss';

type ButtonProps = {
    onClick: () => void;
    label: string;
    className?: string;
};

type CalculatorButtonsProps = {
    onDigitClick: (digit: string) => void;
    onClear: () => void;
    onToggleSign: () => void;
    onModClick: () => void;
    onDotClick: () => void;
    onOperatorClick: (op: '+' | '-' | '×' | '÷') => void;
    onEqualsClick: () => void;
    activeOperator?: string | null;
};

const Button: FC<ButtonProps> = ({ onClick, label, className = '' }) => (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
        {label}
    </button>
);

export const CalculatorButtons: FC<CalculatorButtonsProps> = ({
                                                                  onDigitClick,
                                                                  onClear,
                                                                  onToggleSign,
                                                                  onModClick,
                                                                  onDotClick,
                                                                  onOperatorClick,
                                                                  onEqualsClick,
                                                                  activeOperator,
                                                              }) => {
    const isActive = (op: string) => activeOperator === op ? styles.active : '';

    return (
        <div className={styles.buttonsGrid}>
            <Button
                onClick={onClear}
                label="AC"
                className={styles.functionButton}
            />
            <Button
                onClick={onToggleSign}
                label="+/-"
                className={styles.functionButton}
            />
            <Button
                onClick={onModClick}
                label="%"
                className={styles.functionButton}
            />
            <Button
                onClick={() => onOperatorClick('÷')}
                label="÷"
                className={`${styles.operatorButton} ${isActive('÷')}`}
            />

            {['7', '8', '9'].map(num => (
                <Button
                    key={num}
                    onClick={() => onDigitClick(num)}
                    label={num}
                    className={styles.numberButton}
                />
            ))}
            <Button
                onClick={() => onOperatorClick('×')}
                label="×"
                className={`${styles.operatorButton} ${isActive('×')}`}
            />

            {['4', '5', '6'].map(num => (
                <Button
                    key={num}
                    onClick={() => onDigitClick(num)}
                    label={num}
                    className={styles.numberButton}
                />
            ))}
            <Button
                onClick={() => onOperatorClick('-')}
                label="-"
                className={`${styles.operatorButton} ${isActive('-')}`}
            />

            {['1', '2', '3'].map(num => (
                <Button
                    key={num}
                    onClick={() => onDigitClick(num)}
                    label={num}
                    className={styles.numberButton}
                />
            ))}
            <Button
                onClick={() => onOperatorClick('+')}
                label="+"
                className={`${styles.operatorButton} ${isActive('+')}`}
            />

            <Button
                onClick={() => onDigitClick('0')}
                label="0"
                className={`${styles.numberButton} ${styles.zeroButton}`}
            />
            <Button
                onClick={onDotClick}
                label="."
                className={styles.numberButton}
            />
            <Button
                onClick={onEqualsClick}
                label="="
                className={styles.equalsButton}
            />
        </div>
    );
};
