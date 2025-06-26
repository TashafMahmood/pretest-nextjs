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

export function getBrowserType() {
    const test = (regexp) => {
      return regexp.test(navigator.userAgent);
    };
  
    if (test(/opr\//i) || !!window.opr) {
      return "Opera";
    } else if (test(/edg/i)) {
      // if (window.innerWidth < 500) {
      //   return "Microsoft Edge"
      // } else {
      //   return "desktop browser";
      // }
      return "Microsoft Edge";
    } else if (test(/chrome|chromium|crios/i)) {
      return "Google Chrome";
    } else if (test(/firefox|fxios/i)) {
      // if (window.innerWidth < 500) {
      //   return "Mozilla Firefox";
      // } else {
      //   return "desktop browser";
      // }
      return "Mozilla Firefox";
    } else if (test(/safari/i)) {
      if (test(/Macintosh/i)) return "safari mac";
      return "ios";
    } else if (test(/trident/i)) {
      return "Microsoft Internet Explorer";
    } else if (test(/ucbrowser/i)) {
      return "UC Browser";
    } else if (test(/samsungbrowser/i)) {
      return "Samsung Browser";
    } else {
      return "Unknown browser";
    }
  }