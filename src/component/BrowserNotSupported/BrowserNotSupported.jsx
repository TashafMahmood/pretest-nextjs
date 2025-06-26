import React from "react";
import style from "./browsernotsupported.module.css";
import PaymentHeader from "@/component/PaymentHeader/PaymentHeader";
import Image from "next/image";
import notSupported from "../../../public/notSupported.svg";

const BrowserNotSupported = () => {
  return (
    <div className={style.container_div}>
      <PaymentHeader noDisplay={true} />
      <div className={style.inner_div}>
        <Image src={notSupported} alt="not-supported" />
        <div className={style.title}>Not supported browser</div>
        <div className={style.reason}>
          You&rsquo;re using a web browser we don&rsquo;t support yet.
        </div>
      </div>
    </div>
  );
};

export default BrowserNotSupported;
