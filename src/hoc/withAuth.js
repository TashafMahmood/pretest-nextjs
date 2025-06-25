"use client";

// hoc/withAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("accessToken");
      const nccode = searchParams.get("nccode");

      if (!isLoggedIn) {
        {
          nccode
            ? router.replace(`/membership?nccode=${nccode}`)
            : router.replace(`/membership`);
        }
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
