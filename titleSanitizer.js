function sanitizeString(input) {
    // Replace all non-UTF-8 characters with an empty string and trim
    input = input.replace(/[^\u{0000}-\u{007F}]/gu, '');

    // Replace special characters with XML native chars
    input = input.replace('&', '&#x26;');
    input = input.replace('<', '&#x3C;');

    // Return trimmed input
    return input.trim();
}

module.exports = sanitizeString;