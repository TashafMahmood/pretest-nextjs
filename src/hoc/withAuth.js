// "use client";

// // hoc/withAuth.js
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useSearchParams } from "next/navigation";

// const withAuth = (WrappedComponent) => {
//   return function AuthenticatedComponent(props) {
//     const router = useRouter();
//     const [loading, setLoading] = useState(true);
//     const searchParams = useSearchParams();
//     const nccode = searchParams.get("nccode");

//     console.log(nccode,'---->1 ')

//     useEffect(() => {
//       const isLoggedIn = localStorage.getItem("accessToken");
//       const nccode = searchParams.get("nccode");

//       console.log(nccode, isLoggedIn, "tashaf...");
//       if (!isLoggedIn) {
//         {
//           nccode
//             ? router.replace(`/membership?nccode=${nccode}`)
//             : router.replace(`/membership`);
//         }
//       } else {
//         setLoading(false); // only render component if authenticated
//       }
//     }, []);

//     if (loading) {
//       return null; // or a loader component
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import FullScreenLoader from "@/component/FullScreenLoader/FullScreenLoader";

const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [nccode, setNccode] = useState(null);
    const [timeoutReached, setTimeoutReached] = useState(false);

    // Get nccode
    useEffect(() => {
      const code = searchParams.get("nccode");
      if (code) setNccode(code);
    }, [searchParams]);

    // Set 2-sec fallback timer
    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeoutReached(true);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    // Auth check and redirect
    useEffect(() => {
      const isLoggedIn = localStorage.getItem("accessToken");

      if (!isLoggedIn && (nccode || timeoutReached)) {

        console.log(nccode, timeoutReached, '---->')
        if (nccode) {
          router.replace(`/membership?nccode=${nccode}`);
        } else {
          router.replace(`/membership`);
        }
      }

      if (isLoggedIn) {
        setLoading(false);
      }
    }, [nccode, timeoutReached]);

    // Show loading message
    if (loading) {
      return <FullScreenLoader />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
