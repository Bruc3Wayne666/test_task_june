export const formatNumber = (value: string): string => {
    if (value === 'Error' || value === '∞') return value;

    const [integer, fraction] = value.split('.');
    let formatted = '';

    for (let i = integer.length - 1, count = 0; i >= 0; i--, count++) {
        formatted = integer[i] + (count % 3 === 0 && count !== 0 ? ' ' : '') + formatted;
    }

    return fraction !== undefined
        ? `${formatted.replace(/^-/, '').replace(/\s/g, '')}.${fraction}`
        : formatted;
};
