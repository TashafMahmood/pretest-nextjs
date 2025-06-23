import React from "react";
import style from "./index.module.css";
import successPayment from "../../../public/successPayment.svg";
import leftLeaf from "../../../public/leftLeaf.svg";
import rightLeaf from "../../../public/rightLeaf.svg";
import Image from "next/image";

const PurchaseCompleted = ({ data }) => {
  return (
    <div className={style.inner_div}>
      <div className={style.plan_div}>
        <Image
          src={data?.networkClusterDetails?.logo}
          height={54}
          width={54}
          alt="network-logo"
          className={style.network_logo}
        />
        <div>
          <div className={style.ntw_name}>
            {data?.networkClusterDetails?.name}
          </div>
          <div className={style.ntw_type}>Premium Network</div>
        </div>
      </div>
      <div className={style.content_div}>
        <Image src={successPayment} alt="success" />
        <div className={style.congrats}>Congratulations</div>
        <div className={style.you_are}>You are now a part of</div>
        <div className={style.leafDiv}>
          <Image src={leftLeaf} alt="/" />
          <div className={style.members_count}>
            <div className={style.count}>20,000+</div>
            <div className={style.members}>members of Rotary Club network</div>
          </div>
          <Image src={rightLeaf} alt="/" />
        </div>
        <div className={style.text_msg}>
          You've made the payment for {data?.networkClusterDetails?.name} and
          now is a part of this network, your subscription ends on 26 June 2026.
        </div>
      </div>
    </div>
  );
};

export default PurchaseCompleted;
