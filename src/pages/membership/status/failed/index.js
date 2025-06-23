"use client";

import React, { useState } from "react";
import style from "./index.module.css";
import Image from "next/image";
import failed from "../../../../../public/failedLogo.svg";
import copyIcon from "../../../../../public/copyIcon.svg";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuth";

const Failed = () => {
  const transactionId = "2jdjmsjdn094-msdmdm3-mdk4728";
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(transactionId)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // hide after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleGoHome = () => {
    router.push("/payments");
  };

  return (
    <div className={style.container_div}>
      <div className={style.title}>Transaction Details</div>
      <div className={style.content_div}>
        <Image src={failed} alt="failed" />
        <div className={style.titleTag}>Failed</div>
        <div className={style.details}>
          Your payment of Rs. 1 for the plan yearly is failed. Please try again.
        </div>
        <div className={style.trnsId}>Transaction ID</div>
        <div className={style.trnx}>
          <div>{transactionId}</div>
          <div style={{ position: "relative" }}>
            <Image
              src={copyIcon}
              alt="copy"
              onClick={handleCopy}
              style={{ cursor: "pointer" }}
            />
            {copied && <div className={style.copied}>Copied!</div>}
          </div>
        </div>
        <div className={style.homeBtn} onClick={handleGoHome}>
          <div className={style.home}>Home</div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Failed);
