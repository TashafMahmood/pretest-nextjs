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
  // Prevent scroll on body when modal is open
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return () => {
    // Restore scroll when modal is closed
    document.body.style.overflow = originalOverflow;
  };
}, []);

  return (
    <div className={style.container_div}>
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
