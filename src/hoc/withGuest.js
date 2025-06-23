// hoc/withGuest.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withGuest = (WrappedComponent) => {
  return function GuestComponent(props) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        router.replace("/membership/home"); // ✅ Redirect if logged in
      } else {
        setChecking(false); // ✅ Allow access if not logged in
      }
    }, []);

    if (checking) return null; // ✅ Prevent UI flicker during check

    return <WrappedComponent {...props} />;
  };
};

export default withGuest;
