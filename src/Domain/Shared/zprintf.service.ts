export function zprintf(format: string, ...replacements: number[] | string[]): string {
    if ((format.match(/%[a-z]/gi) || []).length != replacements.length) {
        throw new Error('Not the same amount of replacements as there are replace targets');
    }

    replacements.forEach((replacement) => {
        if (typeof replacement == typeof '') format = format.replace('%s', replacement);
        if (typeof replacement == typeof 0) format = format.replace('%d', replacement.toString());
    });

    return format;
}
