import React from "react";
import Image from "next/image";
import invalidLogo from "../../../public/invalidNetwork.svg";
import style from './invalidnetwork.module.css'

const InvalidNetworkComp = () => {
  return (
    <div className={style.container_div}>
      <div className={style.inner_div}>
        <Image src={invalidLogo} alt="invalid-network" />
        <div className={style.title}>Invalid Network Code</div>
        <div className={style.reason}>
          Please check the Network Code. Network Code Invalid or Network
          Deleted.
        </div>
      </div>
    </div>
  );
};

export default InvalidNetworkComp;
