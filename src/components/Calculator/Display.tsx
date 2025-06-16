import {FC} from 'react';
import styles from './Calculator.module.scss';
import { formatNumber } from '../../utils/formatter.ts';

type DisplayProps = {
    value: string;
};

export const Display: FC<DisplayProps> = ({ value }) => {
    const formattedValue = formatNumber(value);

    return (
        <div className={styles.display} data-testid="display">
            {formattedValue}
        </div>
    );
};
