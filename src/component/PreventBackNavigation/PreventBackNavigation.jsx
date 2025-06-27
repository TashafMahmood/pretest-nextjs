// components/PreventBackNavigation.jsx
"use client";
import { useEffect } from "react";

const PreventBackNavigation = () => {
  useEffect(() => {
    // Push the current state once to history
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      // Push again when back is pressed, so user stays on the same page
      window.history.pushState(null, '', window.location.href);
    };

    console.log(window.location.href,'RRR')

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
};

export default PreventBackNavigation;
