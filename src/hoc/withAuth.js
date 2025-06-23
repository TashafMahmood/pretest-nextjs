'use client'

// hoc/withAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("accessToken");

      if (!isLoggedIn) {
        router.replace("/membership");
      } else {
        setLoading(false); // only render component if authenticated
      }
    }, []);

    if (loading) {
      return null; // or a loader component
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;


