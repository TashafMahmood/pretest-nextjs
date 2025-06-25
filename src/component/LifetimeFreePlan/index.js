import React from "react";
import style from "./index.module.css";
import logo from "../../../public/freenetwork.svg";
import leftLeaf from "../../../public/leftLeaf.svg";
import rightLeaf from "../../../public/rightLeaf.svg";
import freeNetwork from "../../../public/freenetwork.svg";
import Image from "next/image";
import moment from "moment";

const LifetimeFreePlan = ({ data, setRenew }) => {
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
          <div className={style.ntw_type}>Free Network</div>
        </div>
      </div>
      <div className={style.content_div}>
        <Image src={freeNetwork} alt="success" />
        <div className={style.congrats}>Lifetime free access</div>

        <div className={style.text_msg}>
          You have been given life time free access. You need not pay
        </div>
      </div>
    </div>
  );
};

export default LifetimeFreePlan;
