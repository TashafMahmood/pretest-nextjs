import React from "react";
import style from "./index.module.css";
import PaymentHeader from "@/component/PaymentHeader/PaymentHeader";
import Image from "next/image";
import invalidLogo from "../../../../public/invalidNetwork.svg";
import { useLogout } from "@/context/LogoutContext";
import LogoutPayment from "@/component/LogoutPayment/LogoutPayment";

const InvalidNetwork = () => {
  const { isOpen } = useLogout();

  return (
    <div className={style.container_div}>
      <PaymentHeader />
      <div className={style.inner_div}>
        <Image src={invalidLogo} alt="invalid-network" />
        <div className={style.title}>Invalid Network Code</div>
        <div className={style.reason}>
          Please check the Network Code. Network Code Invalid or Network
          Deleted.
        </div>
      </div>
      {isOpen && <LogoutPayment/>}
    </div>
  );
};

export default InvalidNetwork;
