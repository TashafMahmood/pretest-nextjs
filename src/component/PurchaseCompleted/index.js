import React from "react";
import style from "./index.module.css";
import successPayment from "../../../public/successPayment.svg";
import leftLeaf from "../../../public/leftLeaf.svg";
import rightLeaf from "../../../public/rightLeaf.svg";
import Image from "next/image";
import moment from "moment";

const PurchaseCompleted = ({ data, setRenew }) => {
  console.log(data, "data...");
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
            {data?.networkClusterDetails?.name?.length > 18
              ? data.networkClusterDetails.name.slice(0, 18) + "..."
              : data?.networkClusterDetails?.name}
          </div>
          {/* <div className={style.ntw_name}>
            {data?.networkClusterDetails?.name}
          </div> */}

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
            <div className={style.count}>
              {data?.networkClusterDetails?.numberOfMembers}+
            </div>
            <div className={style.members}>
              members of {data?.networkClusterDetails?.name}
            </div>
          </div>
          <Image src={rightLeaf} alt="/" />
        </div>
        <div className={style.text_msg}>
          You've made the payment for {data?.networkClusterDetails?.name} and
          now is a part of this network, your subscription starts on{" "}
          {moment(data?.memberShipDetails?.subscriptionStartDate).format(
            "DD MMMM YYYY"
          )}{" "}
          and ends on{" "}
          {moment(data?.memberShipDetails?.subscriptionEndDate).format(
            "DD MMMM YYYY"
          )}
          .
        </div>
      </div>
      <div className={style.stickyBtnWrapper} onClick={() => setRenew(true)}>
        <button className={style.stickyBtn}>Renew now</button>
      </div>
    </div>
  );
};

export default PurchaseCompleted;
