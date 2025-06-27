// import React, { useEffect } from "react";
// import style from "./index.module.css";
// import { useLogout } from "@/context/LogoutContext";
// import { useRouter, useSearchParams } from "next/navigation";

// const LogoutPayment = () => {
//   const { setIsOpen } = useLogout();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const nccode = searchParams.get("nccode");

//   const logoutNow = () => {
//     setIsOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("userdata");
//     localStorage.removeItem("trxId");
//     router.push(nccode ? `/membership?nccode=${nccode}` : "/membership");
//     setIsOpen(false);
//   };

//   return (
//     <div className={style.container_div}>
//       <div className={style.popup_logout}>
//         <div className={style.text}>
//           Are you sure you want to <br /> logout?
//         </div>
//         <div className={style.buttons_div}>
//           <div className={style.cancel_btn} onClick={logoutNow}>
//             Cancel
//           </div>
//           <div className={style.logout_btn} onClick={handleLogout}>
//             Logout
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogoutPayment;


"use client";

import React, { useEffect } from "react";
import style from "./index.module.css";
import { useLogout } from "@/context/LogoutContext";
import { useRouter, useSearchParams } from "next/navigation";

const LogoutPayment = () => {
  const { setIsOpen } = useLogout();
  const router = useRouter();
  const searchParams = useSearchParams();

  const nccode = searchParams.get("nccode");

  const logoutNow = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userdata");
    localStorage.removeItem("trxId");
    router.push(nccode ? `/membership?nccode=${nccode}` : "/membership");
    setIsOpen(false);
  };

  useEffect(() => {
    // 1. Fix for 100vh issues on mobile
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.getElementById("logout-overlay")?.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);

    // 2. Prevent body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", setViewportHeight);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className={style.container_div} id="logout-overlay">
      <div className={style.popup_logout}>
        <div className={style.text}>
          Are you sure you want to <br /> logout?
        </div>
        <div className={style.buttons_div}>
          <div className={style.cancel_btn} onClick={logoutNow}>
            Cancel
          </div>
          <div className={style.logout_btn} onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPayment;
