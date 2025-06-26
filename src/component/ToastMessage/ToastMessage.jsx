

import React from "react";
import style from "./toastmessage.module.css";
import Image from "next/image";
import errorLogo from "../../../public/redcross.svg";
import cross from "../../../public/cross.svg";

const ToastMessage = ({close, message}) => {
  return (
    <div className={style.toast_div}>
      <div className={style.main_toast_div}>
        <Image src={errorLogo} alt="" />
        <div className={style.error_div}>
          <div className={style.invalid_ntw}>{message}</div>
        </div>
        <Image src={cross} alt="" className={style.close_cross_btn} onClick={close}/>
      </div>
    </div>
  );
};

export default ToastMessage;
