export const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // Remove non-digit characters
    const match = cleaned.match(/^(\d{10})$/);

    if (match) {
        const formatted = match[1].replace(/^(\d{3})(\d{3})(\d{4})$/, '+91 $1 $2 $3');
        return formatted;
    } else {
        // If input is not exactly 10 digits, return with the country code prefix
        return '+91 ' + cleaned.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3');
    }
};