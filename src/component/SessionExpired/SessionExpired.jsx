import React from "react";
import style from "./sessionexpired.module.css";
import PaymentHeader from "../PaymentHeader/PaymentHeader";
import Image from "next/image";
import logo from "../../../public/sessionExpired.png";
import { useRouter, useSearchParams } from "next/navigation";
import { useLogout } from "@/context/LogoutContext";

const SessionExpired = () => {
  const { setIsOpen } = useLogout();

  const router = useRouter();
  const searchParams = useSearchParams();
  const nccode = searchParams.get("nccode");

  const retryNow = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userdata");
    localStorage.removeItem("trxId");
    router.push(nccode ? `/membership?nccode=${nccode}` : "/membership");
    setIsOpen(false);
  };

  return (
    <div className={style.container_div}>
      {/* <PaymentHeader /> */}
      <div className={style.content_div}>
        <Image src={logo} alt="" className={style.logo} />
        <div className={style.heading_text}>Something’s went wrong...</div>
        <div className={style.desc_text}>
          Seems like you are not logged in. Please Retry
        </div>
        <div className={style.button_wrapper}>
          <div className={style.retry_btn} onClick={retryNow}>
            Retry
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionExpired;
