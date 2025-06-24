import React from "react";
import style from "./index.module.css";
import { useLogout } from "@/context/LogoutContext";
import { useRouter } from "next/navigation";

const LogoutPayment = () => {
  const { setIsOpen } = useLogout();
  const router = useRouter()

  const logoutNow = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear("accessToken");
    router.push("/membership");
    setIsOpen(false);
  };

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
