import React from "react";
import style from "./index.module.css";
import pendingPayment from "../../../public/pendingPayment.svg";
import leftLeaf from "../../../public/leftLeaf.svg";
import rightLeaf from "../../../public/rightLeaf.svg";
import Image from "next/image";
import purchasedLogo from "../../../public/purchasedLogo.svg";

const PurchasePending = () => {
  return (
    <div className={style.inner_div}>
      <div className={style.plan_div}>
        <Image src={purchasedLogo} alt="network-logo" />
        <div>
          <div className={style.ntw_name}>Rotary Club of Malad</div>
          <div className={style.ntw_type}>Premium Network</div>
        </div>
      </div>
      <div className={style.content_div}>
        <Image src={pendingPayment} alt="success" />
        <div className={style.congrats}>Payment Pending!</div>
        <div className={style.text_msg}>
          For Rotary Club network payment is under process, please check after
          sometime.
        </div>
      </div>
    </div>
  );
};

export default PurchasePending;
